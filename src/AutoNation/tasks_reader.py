import json
import pkg_resources

TASKS = 'Tasks'
TASK_NAME = 'TaskName'
TASK_COMMANDS = 'TaskCommands'

class TasksReader:
    _self = None
    tasks = None
    tasks_file_path = pkg_resources.resource_filename(__name__, 'tasks.json')

    def __new__(cls, *args, **kwargs):
        if cls._self is None:
            cls._self = super(TasksReader, cls).__new__(cls)
            cls.read_json_file()
        return cls._self

    @staticmethod
    def read_json_file():
        with open(TasksReader.tasks_file_path, 'r') as tasks_file:
            TasksReader.tasks = json.load(tasks_file)            

    @staticmethod
    def get_task_names():
        return [task.get(TASK_NAME) for task in TasksReader.tasks.get(TASKS)]

    @staticmethod
    def get_task_commands(task_name):
        for task in TasksReader.tasks.get(TASKS):
            if task.get(TASK_NAME) == task_name:
                return task.get(TASK_COMMANDS)
