import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk, Gdk

from .home_page import HomePage
from .tasks_reader import TasksReader

class AutoNation(Gtk.Application):
    def __init__(self):
        super().__init__()

        TasksReader()

        self.home_page = HomePage()

        screen = Gdk.Screen.get_default()
        width, height = screen.get_width(), screen.get_height()
        window_width = int(width * 0.3)
        window_height = int(height * 0.3)
        
        self.window = Gtk.Window()
        self.window.set_default_size(window_width, window_height)
        self.window.set_position(Gtk.WindowPosition.CENTER)

        self.window.add(self.home_page)

    def do_activate(self):
        self.add_window(self.window)
        self.window.show_all()
