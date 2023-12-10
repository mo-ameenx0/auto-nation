import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk

import pkg_resources

@Gtk.Template(filename=pkg_resources.resource_filename(__name__, 'router_widget.glade'))
class RouterWidget(Gtk.Box):
    __gtype_name__ = 'RouterWidget'

    router_ip = Gtk.Template.Child()
    router_out_label = Gtk.Template.Child()
    router_err_label = Gtk.Template.Child()

    def __init__(self, router_ip, router_out, router_err):
        super().__init__()

        self.router_ip.set_text(router_ip)
        self.router_out_label.set_text(router_out)
        self.router_err_label.set_text(router_err)

        self.show_all()
        