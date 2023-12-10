import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk, GLib

from functools import partial

from .router_widget import RouterWidget
from .ssh_client import SSH_Client
from .tasks_reader import TasksReader
from .utils import validate_ip_address
from .error_messages import *

import pkg_resources
import asyncio

NOTIFICATION_DELAY = 5000

@Gtk.Template(filename=pkg_resources.resource_filename(__name__, 'home_page.glade'))
class HomePage(Gtk.Overlay):
    __gtype_name__ = 'HomePage'

    routers_info_box = Gtk.Template.Child()
    prompt_box = Gtk.Template.Child()

    router_ips = Gtk.Template.Child()
    tasks_combo_box = Gtk.Template.Child()

    run_task = Gtk.Template.Child()

    loading_box = Gtk.Template.Child()
    loading_label = Gtk.Template.Child()
    loading_spinner = Gtk.Template.Child()

    notification = Gtk.Template.Child()
    notification_message = Gtk.Template.Child()

    def __init__(self):
        super().__init__()

        self._setup_task_combo_box()

    def _setup_task_combo_box(self):
        for task_name in TasksReader.get_task_names():
            self.tasks_combo_box.append_text(task_name)

    @Gtk.Template.Callback()
    def run_task_clicked_cb(self, *args, **kwargs):
        router_ips = self.router_ips.get_text().strip()
        current_task = self.tasks_combo_box.get_active_text()

        if not router_ips:
            self._show_notification(NO_ROUTER_IPS)
            return

        router_ips = [ip.strip() for ip in router_ips.split(',')]

        for ip in router_ips:
            if not validate_ip_address(ip):
                self._show_notification(WRONG_IP_FORMAT.format(wrong_ip=ip))
                return

        if current_task is None:
            self._show_notification(NO_TASK_SELECTED)
            return

        self.loading_box.set_visible(True)
        self.loading_label.set_text(f'Running the task for {len(router_ips)} routers')
        self.loading_spinner.start()
        self.run_task.set_sensitive(False)

        for child in self.routers_info_box.get_children():
            self.routers_info_box.remove(child)

        current_commands = TasksReader.get_task_commands(current_task)

        tasks = []
        for router_ip in router_ips:
            task = asyncio.create_task(self.run_task_commands(router_ip, current_commands))
            task.add_done_callback(
                partial(
                    self.update_router_info_cb,
                    router_ip,
                )
            )
            tasks.append(task)

        gather = asyncio.gather(*tasks)
        gather.add_done_callback(self.task_completed)

    async def run_task_commands(self, ip, commands):
        stdout, stderr = await SSH_Client.exec_commands(ip, commands)

        return stdout, stderr

    def update_router_info_cb(self, router_ip, task, *args, **kwargs):
        stdout, stderr = task.result()
        router_widget = RouterWidget(
            router_ip,
            ' '.join(stdout),
            ' '.join(stderr)
        )

        self.routers_info_box.add(router_widget)

    def task_completed(self, task, *args, **kwargs):
        self.loading_spinner.stop()
        self.loading_label.set_text('The task completed')
        self.run_task.set_sensitive(True)

    def _show_notification(self, message):
        self.notification_message.set_text(message)
        self.notification.set_reveal_child(True)
        self.notification.auto_hide_id = GLib.timeout_add(
            NOTIFICATION_DELAY, self._close_notification
        )

    def _close_notification(self):
        self.notification.set_reveal_child(False)
        GLib.source_remove(self.notification.auto_hide_id)
        del self.notification.auto_hide_id
