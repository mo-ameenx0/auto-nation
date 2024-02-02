## UI Implementation
Develop a component based UI that allows the user to create his own set of tasks.
The task consists is built as follow (Task->Steps->Fields->Output)
1. Task
The task might has multiple steps to complete a single task. (e.g. configure VLAN)

2. Steps
A step contains the command that will be sent to the end device. The command is devided into multiple fields.

3. Fields
Fields are such as (text fileds, drop down, or check boxes)

4. Output
Based on the previous task the output is displayed and filtered based on a regular expression set by the user.
