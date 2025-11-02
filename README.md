# 🎰 Baby Task Tracker & Wheel Spin System

A task management and motivation system designed for children. Earn points by completing tasks, accumulate points to participate in wheel spins, helping children develop self-discipline and learning habits.

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Usage Guide](#usage-guide)
- [Interface Introduction](#interface-introduction)
- [Feature Details](#feature-details)
- [Data Information](#data-information)
- [Important Notes](#important-notes)

## ✨ Features

### Core Features
- ✅ **Multi-user Management**: Support multiple children to use independently, each user's data is completely independent
- ✅ **Task Management**: Customizable task list, support adding, deleting, and modifying tasks
- ✅ **Points System**: Earn points by completing tasks, accumulated points can be used for draws
- ✅ **Wheel Spin**: Configurable wheel spin, support probability settings and prize restrictions
- ✅ **Completion Rewards**: Complete 50%/75%/100% of tasks to earn additional point rewards
- ✅ **Consecutive Completion Rewards**: Earn additional rewards for consecutive task completion
- ✅ **Achievement Badges**: 50 different achievement badges to motivate children to keep improving
- ✅ **History Records**: View daily task completion status and spin history
- ✅ **Data Persistence**: All data is automatically saved locally, no need to worry about data loss

### Motivation System
- 🎯 Complete 50% of tasks: Extra reward +2 points
- ⭐ Complete 75% of tasks: Extra reward +5 points
- 🏆 Complete 100% of tasks: Extra reward +10 points
- 📅 Consecutive completion: Weekly consecutive completion earns additional rewards
- 🎰 Spin System: Spend points to participate in wheel spins and get surprise rewards

## 🚀 Quick Start

### How to Use
1. Open the `index.html` file directly in your browser
2. No installation required, pure web application
3. Supports all modern browsers (Chrome, Firefox, Safari, Edge, etc.)

### First Time Use
1. After opening the page, click the **👤 User Management** button in the top right
2. Add the first user (name, gender)
3. Select that user as the current user
4. Start using!

## 📸 Screenshots

![Main Interface](screenshots/main-page.png)

*Main interface of the system, including wheel spin area, task management, points display and other features*

## 📖 Usage Guide

### 1. User Management

#### Add User
1. Click the **👤 User Management** button at the top of the page
2. In the pop-up dialog, enter the user name
3. Select gender (default: Female)
4. Click the **Add User** button

#### Switch User
1. In the user management dialog, click the **Select** button in the user list
2. The selected user will be displayed at the "Current User" area at the top of the page
3. **Important**: You must select a user before performing any operations

#### Edit/Delete User
- Click the **✏️** button on the right side of the user item to edit user information
- Click the **🗑️** button to delete a user (at least one user must be retained)

### 2. Task Management

#### Complete Tasks
1. In the task list, find the task you want to complete
2. Click the **○** button on the right side of the task, it will change to **✓**
3. After the task is completed, you will automatically receive corresponding points

#### Add Tasks
1. Click the **+ Add Task** button in the top right of the task management area
2. The new task will be added to the end of the list
3. You can modify the task name and point value (default: 1 point)

#### Modify Tasks
- **Task Name**: Click directly on the task name to edit
- **Point Value**: Click the point input box to modify (minimum 1 point)
- **Delete Task**: Click the **×** button on the right side of the task (at least 1 task must be retained)

#### View History
1. In the "This Week's Progress" area, click any date in the calendar
2. The task list will show the completion status for that date (read-only)
3. Click the **Back to Today** button to switch back to today

### 3. Points System

#### Earn Points
- **Complete Tasks**: Earn corresponding points for each completed task (default: 1 point)
- **Completion Rewards**:
  - Complete 50% of tasks: +2 points
  - Complete 75% of tasks: +5 points
  - Complete 100% of tasks: +10 points
- **Consecutive Completion Rewards**: Earn additional rewards for consecutive task completion

#### Spend Points
- **Wheel Spin**: Default cost is 100 points (can be configured in the top right)
- Cannot spin if points are insufficient

#### Configure Spin Cost
1. Click the **⚙️** button in the top right of the page
2. Enter the new spin cost point value
3. Click confirm to save

### 4. Wheel Spin

#### Spin the Wheel
1. Ensure you have enough points (displayed in the top right)
2. Click the **Start Spin** button below the wheel
3. Wait for the wheel to finish spinning
4. View the reward you received

#### View Spin History
1. Scroll to the "Achievement Badges" area at the bottom of the page
2. Click the **📊 Statistics** button
3. In the pop-up dialog, scroll down to view "🎰 Spin History"
4. History is grouped by date, showing:
   - Spin time
   - Prize received
   - Points spent

#### Prize Restrictions (Advanced Feature)
Some prizes can have restrictions:
- **Annual Limit**: Can only be obtained once per year
- **Monthly Limit**: Can only be obtained once per month
- **Daily Limit**: Can only be obtained once per day

Restricted prizes can be set in the prize configuration area.

### 5. Achievement System

#### View Achievements
- View all achievements in the "🏆 Achievement Badges" area at the bottom of the page
- Unlocked achievements will be highlighted
- Locked achievements will be displayed in gray

#### Achievement Types
The system includes 50 different achievements, including:
- Task completion related achievements (cumulative task completions)
- Points related achievements (cumulative points earned, current points)
- Consecutive completion achievements (consecutive completion days)
- Single day complete all tasks achievements
- Usage days achievements

### 6. Statistics

#### View Statistics
1. Click the **📊 Statistics** button in the top right of the "Achievement Badges" area
2. View the following statistics:
   - Cumulative task completions
   - Cumulative points earned
   - Maximum consecutive days
   - Current level
   - Days with records
   - Cumulative spins
   - **Spin History** (detailed list)

### 7. Calendar and History

#### Using the Calendar
1. In the "📅 History" area, use the **‹** and **›** buttons to switch months
2. Click any date on the calendar
3. View for that date:
   - Task completion status
   - Points earned
   - List of completed tasks

#### This Week's Progress
- Shows daily task completion status for this week
- Click a date to view detailed information for that day
- Click **Back to Today** to switch back to today

## 🖥️ Interface Introduction

### Page Layout

```
┌─────────────────────────────────────────┐
│  Title + User Management + Points       │
├─────────────────────────────────────────┤
│                                         │
│           🎡 Wheel Spin Area             │
│                                         │
├─────────────────────────────────────────┤
│  📋 Task Management                     │
│  - Task List                            │
│  - Today's Progress                     │
│  - Completion Reward Hints              │
│  - Consecutive Days                     │
│  - This Week's Progress (Calendar)      │
├─────────────────────────────────────────┤
│  📅 History (Calendar)                  │
├─────────────────────────────────────────┤
│  🏆 Achievement Badges + Stats Button   │
└─────────────────────────────────────────┘
```

### Main Area Descriptions

1. **Top Navigation Bar**
   - Current user display
   - User management button
   - Current points display
   - Spin cost display
   - Spin cost configuration button

2. **Wheel Area**
   - Colorful wheel (displays reward numbers)
   - Spin button
   - Spin result notification

3. **Task Management Area**
   - Task list (editable)
   - Today's progress bar
   - Completion reward hints
   - Consecutive completion days
   - This week's progress calendar

4. **History Calendar**
   - Month navigation
   - Calendar grid
   - Click date to view history

5. **Achievement Badges Area**
   - Achievement list
   - Statistics button
   - Clear data button

## 🔧 Feature Details

### Completion Reward Mechanism

#### Reward Rules
- **50% Complete**: Complete at least 50% of tasks, earn +2 points
- **75% Complete**: Complete at least 75% of tasks, earn +5 points
- **100% Complete**: Complete all tasks, earn +10 points

#### Priority
- If 100% complete, only give +10 points, no other rewards
- If 75% complete, only give +5 points, no 50% reward
- If 50% complete, give +2 points

#### Reward Display
Completion reward hints will be displayed below "Today's Progress":
- 🎯 Complete 50% of tasks, extra reward +2 points
- ⭐ Complete 75% of tasks, extra reward +5 points
- 🏆 Complete all tasks, extra reward +10 points

Completed reward items will show a ✅ mark.

### Consecutive Completion Rewards

- Weekly consecutive completion of all tasks earns additional rewards
- More consecutive days = more rewards
- Resets after interruption

### Achievement System Details

Achievements are divided into multiple categories:

1. **Task Completion Achievements**: Cumulative task completions reach certain amounts
2. **Points Achievements**: Cumulative points earned or current points held reach certain amounts
3. **Consecutive Completion Achievements**: Consecutive task completion days reach certain amounts
4. **Perfect Day Achievements**: Number of days completing all tasks in a single day
5. **Usage Days Achievements**: Cumulative days using the system

### Data Persistence

- All data is automatically saved to browser's `localStorage`
- Includes:
  - User information
  - Task lists
  - Points data
  - Completion history
  - Spin history
  - Achievement status
  - Prize configuration

### Clear Data

⚠️ **Warning**: Clearing data will delete all records, including:
- All user data
- Task completion records
- Points and statistics
- Spin history
- Achievement progress

After clearing, all data will reset to default values:
- Default points: 100
- Default spin cost: 100 points

## 💾 Data Information

### Default Task List

The system comes with 18 default tasks (1 point each):
1. Complete school homework independently after school
2. Complete 2 pages of English/math problems assigned by mom independently after school
3. Complete 2 pages of English writing/dictation assigned by mom independently after school
4. Read books independently for 30 minutes
5. Help parents with housework independently
6. 30 minutes of outdoor exercise daily
7. Draw a picture/complete art creation
8. Wake up, brush teeth, wash face, complete personal hygiene independently every morning
9. Pack school bag and check books and items to bring daily
10. Greet security guards/aunts/uncles/known friends politely with eye contact daily
11. Tell dad or mom about today's class content after school
12. Complete 2 pages of Chinese writing/dictation assigned by mom independently after school
13. Memorize 10 new English words independently after school
14. Memorize 5 Chinese idioms independently after school
15. Memorize 1 ancient poem independently after school
16. Learn about 1 history story independently and explain to dad or mom
17. Attend English class independently, do preview and review in advance
18. Return toys or books to their original places after use

### Default Prize Configuration

The system comes with multiple prizes, each with configurable probability.

### User Data Independence

- Each user has completely independent data:
  - Task list (customizable)
  - Points and statistics
  - Completion history
  - Spin history
  - Achievement progress

## ⚠️ Important Notes

### Usage Limitations

1. **Must Select User**: All operations (tasks, spins, etc.) require selecting a user first
2. **Local Data Storage**: Data is saved in browser local storage, clearing browser data will cause data loss
3. **Browser Compatibility**: Recommended to use modern browsers (Chrome, Firefox, Safari, Edge)

### Operation Tips

1. **Switch Date**: When viewing historical dates, the task list becomes read-only mode
2. **Task Editing**: Tasks can only be edited when viewing today
3. **Insufficient Points**: Cannot spin if points are insufficient, will show notification
4. **Deletion Restrictions**: Must keep at least 1 user and 1 task

### Data Backup

To backup data:
1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Find Local Storage
4. Export relevant data

### Frequently Asked Questions

**Q: How to reset a user's data?**  
A: You can delete the user and re-add them in user management, or clear all data.

**Q: Where to view spin history?**  
A: Click the "📊 Statistics" button at the bottom of the page, scroll down in the pop-up dialog to see "🎰 Spin History".

**Q: How to modify prize configuration?**  
A: Prize configuration is hidden (can be displayed through developer tools), mainly used to set prize probability and restriction rules.

**Q: Will data be lost?**  
A: Data is saved in browser local storage, clearing browser cache or using private mode may cause data loss. Regular backup is recommended.

## 📝 Update Log

### Current Version Features
- ✅ Multi-user management system
- ✅ Task management and points system
- ✅ Wheel spin functionality
- ✅ Completion reward mechanism
- ✅ Consecutive completion rewards
- ✅ 50 achievement badges
- ✅ History viewing
- ✅ Spin history records
- ✅ Calendar functionality
- ✅ Statistics information
- ✅ Responsive design

## 📞 Technical Support

If you have questions or suggestions, please check:
1. Browser console for error messages (press F12 to open)
2. Whether a user is selected
3. Whether data is saved correctly

---

**Enjoy using!** 🎉

---

# 🎰 宝贝任务打卡 & 转盘抽奖系统

一个专为儿童设计的任务管理和激励系统，通过完成任务获得积分，累积积分可以参与转盘抽奖，帮助培养孩子的自律性和学习习惯。

## 📋 目录

- [功能特点](#功能特点)
- [快速开始](#快速开始)
- [使用说明](#使用说明)
- [界面介绍](#界面介绍)
- [功能详解](#功能详解)
- [数据说明](#数据说明)
- [注意事项](#注意事项)

## ✨ 功能特点

### Core Features
- ✅ **Multi-user Management**: Support multiple children to use independently, each user's data is completely independent
- ✅ **Task Management**: Customizable task list, support adding, deleting, and modifying tasks
- ✅ **Points System**: Earn points by completing tasks, accumulated points can be used for draws
- ✅ **Wheel Spin**: Configurable wheel spin, support probability settings and prize restrictions
- ✅ **Completion Rewards**: Complete 50%/75%/100% of tasks to earn additional point rewards
- ✅ **Consecutive Completion Rewards**: Earn additional rewards for consecutive task completion
- ✅ **Achievement Badges**: 50 different achievement badges to motivate children to keep improving
- ✅ **History Records**: View daily task completion status and spin history
- ✅ **Data Persistence**: All data is automatically saved locally, no need to worry about data loss

### Motivation System
- 🎯 Complete 50% of tasks: Extra reward +2 points
- ⭐ Complete 75% of tasks: Extra reward +5 points
- 🏆 Complete 100% of tasks: Extra reward +10 points
- 📅 Consecutive completion: Weekly consecutive completion earns additional rewards
- 🎰 Spin System: Spend points to participate in wheel spins and get surprise rewards

## 🚀 Quick Start

### How to Use
1. Open the `index.html` file directly in your browser
2. No installation required, pure web application
3. Supports all modern browsers (Chrome, Firefox, Safari, Edge, etc.)

### First Time Use
1. After opening the page, click the **👤 User Management** button in the top right
2. Add the first user (name, gender)
3. Select that user as the current user
4. Start using!

## 📸 Screenshots

![Main Interface](screenshots/main-page.png)

*Main interface of the system, including wheel spin area, task management, points display and other features*

## 📖 Usage Guide

### 1. User Management

#### Add User
1. Click the **👤 User Management** button at the top of the page
2. In the pop-up dialog, enter the user name
3. Select gender (default: Female)
4. Click the **Add User** button

#### Switch User
1. In the user management dialog, click the **Select** button in the user list
2. The selected user will be displayed at the "Current User" area at the top of the page
3. **Important**: You must select a user before performing any operations

#### Edit/Delete User
- Click the **✏️** button on the right side of the user item to edit user information
- Click the **🗑️** button to delete a user (at least one user must be retained)

### 2. Task Management

#### Complete Tasks
1. In the task list, find the task you want to complete
2. Click the **○** button on the right side of the task, it will change to **✓**
3. After the task is completed, you will automatically receive corresponding points

#### Add Tasks
1. Click the **+ Add Task** button in the top right of the task management area
2. The new task will be added to the end of the list
3. You can modify the task name and point value (default: 1 point)

#### Modify Tasks
- **Task Name**: Click directly on the task name to edit
- **Point Value**: Click the point input box to modify (minimum 1 point)
- **Delete Task**: Click the **×** button on the right side of the task (at least 1 task must be retained)

#### View History
1. In the "This Week's Progress" area, click any date in the calendar
2. The task list will show the completion status for that date (read-only)
3. Click the **Back to Today** button to switch back to today

### 3. Points System

#### Earn Points
- **Complete Tasks**: Earn corresponding points for each completed task (default: 1 point)
- **Completion Rewards**:
  - Complete 50% of tasks: +2 points
  - Complete 75% of tasks: +5 points
  - Complete 100% of tasks: +10 points
- **Consecutive Completion Rewards**: Earn additional rewards for consecutive task completion

#### Spend Points
- **Wheel Spin**: Default cost is 100 points (can be configured in the top right)
- Cannot spin if points are insufficient

#### Configure Spin Cost
1. Click the **⚙️** button in the top right of the page
2. Enter the new spin cost point value
3. Click confirm to save

### 4. Wheel Spin

#### Spin the Wheel
1. Ensure you have enough points (displayed in the top right)
2. Click the **Start Spin** button below the wheel
3. Wait for the wheel to finish spinning
4. View the reward you received

#### View Spin History
1. Scroll to the "Achievement Badges" area at the bottom of the page
2. Click the **📊 Statistics** button
3. In the pop-up dialog, scroll down to view "🎰 Spin History"
4. History is grouped by date, showing:
   - Spin time
   - Prize received
   - Points spent

#### Prize Restrictions (Advanced Feature)
Some prizes can have restrictions:
- **Annual Limit**: Can only be obtained once per year
- **Monthly Limit**: Can only be obtained once per month
- **Daily Limit**: Can only be obtained once per day

Restricted prizes can be set in the prize configuration area.

### 5. Achievement System

#### View Achievements
- View all achievements in the "🏆 Achievement Badges" area at the bottom of the page
- Unlocked achievements will be highlighted
- Locked achievements will be displayed in gray

#### Achievement Types
The system includes 50 different achievements, including:
- Task completion related achievements (cumulative task completions)
- Points related achievements (cumulative points earned, current points)
- Consecutive completion achievements (consecutive completion days)
- Single day complete all tasks achievements
- Usage days achievements

### 6. Statistics

#### View Statistics
1. Click the **📊 Statistics** button in the top right of the "Achievement Badges" area
2. View the following statistics:
   - Cumulative task completions
   - Cumulative points earned
   - Maximum consecutive days
   - Current level
   - Days with records
   - Cumulative spins
   - **Spin History** (detailed list)

### 7. Calendar and History

#### Using the Calendar
1. In the "📅 History" area, use the **‹** and **›** buttons to switch months
2. Click any date on the calendar
3. View for that date:
   - Task completion status
   - Points earned
   - List of completed tasks

#### This Week's Progress
- Shows daily task completion status for this week
- Click a date to view detailed information for that day
- Click **Back to Today** to switch back to today

## 🖥️ Interface Introduction

### Page Layout

```
┌─────────────────────────────────────────┐
│  Title + User Management + Points       │
├─────────────────────────────────────────┤
│                                         │
│           🎡 Wheel Spin Area             │
│                                         │
├─────────────────────────────────────────┤
│  📋 Task Management                     │
│  - Task List                            │
│  - Today's Progress                     │
│  - Completion Reward Hints              │
│  - Consecutive Days                     │
│  - This Week's Progress (Calendar)      │
├─────────────────────────────────────────┤
│  📅 History (Calendar)                  │
├─────────────────────────────────────────┤
│  🏆 Achievement Badges + Stats Button   │
└─────────────────────────────────────────┘
```

### Main Area Descriptions

1. **Top Navigation Bar**
   - Current user display
   - User management button
   - Current points display
   - Spin cost display
   - Spin cost configuration button

2. **Wheel Area**
   - Colorful wheel (displays reward numbers)
   - Spin button
   - Spin result notification

3. **Task Management Area**
   - Task list (editable)
   - Today's progress bar
   - Completion reward hints
   - Consecutive completion days
   - This week's progress calendar

4. **History Calendar**
   - Month navigation
   - Calendar grid
   - Click date to view history

5. **Achievement Badges Area**
   - Achievement list
   - Statistics button
   - Clear data button

## 🔧 Feature Details

### Completion Reward Mechanism

#### Reward Rules
- **50% Complete**: Complete at least 50% of tasks, earn +2 points
- **75% Complete**: Complete at least 75% of tasks, earn +5 points
- **100% Complete**: Complete all tasks, earn +10 points

#### Priority
- If 100% complete, only give +10 points, no other rewards
- If 75% complete, only give +5 points, no 50% reward
- If 50% complete, give +2 points

#### Reward Display
Completion reward hints will be displayed below "Today's Progress":
- 🎯 Complete 50% of tasks, extra reward +2 points
- ⭐ Complete 75% of tasks, extra reward +5 points
- 🏆 Complete all tasks, extra reward +10 points

Completed reward items will show a ✅ mark.

### Consecutive Completion Rewards

- Weekly consecutive completion of all tasks earns additional rewards
- More consecutive days = more rewards
- Resets after interruption

### Achievement System Details

Achievements are divided into multiple categories:

1. **Task Completion Achievements**: Cumulative task completions reach certain amounts
2. **Points Achievements**: Cumulative points earned or current points held reach certain amounts
3. **Consecutive Completion Achievements**: Consecutive task completion days reach certain amounts
4. **Perfect Day Achievements**: Number of days completing all tasks in a single day
5. **Usage Days Achievements**: Cumulative days using the system

### Data Persistence

- All data is automatically saved to browser's `localStorage`
- Includes:
  - User information
  - Task lists
  - Points data
  - Completion history
  - Spin history
  - Achievement status
  - Prize configuration

### Clear Data

⚠️ **Warning**: Clearing data will delete all records, including:
- All user data
- Task completion records
- Points and statistics
- Spin history
- Achievement progress

After clearing, all data will reset to default values:
- Default points: 100
- Default spin cost: 100 points

## 💾 Data Information

### Default Task List

The system comes with 18 default tasks (1 point each):
1. Complete school homework independently after school
2. Complete 2 pages of English/math problems assigned by mom independently after school
3. Complete 2 pages of English writing/dictation assigned by mom independently after school
4. Read books independently for 30 minutes
5. Help parents with housework independently
6. 30 minutes of outdoor exercise daily
7. Draw a picture/complete art creation
8. Wake up, brush teeth, wash face, complete personal hygiene independently every morning
9. Pack school bag and check books and items to bring daily
10. Greet security guards/aunts/uncles/known friends politely with eye contact daily
11. Tell dad or mom about today's class content after school
12. Complete 2 pages of Chinese writing/dictation assigned by mom independently after school
13. Memorize 10 new English words independently after school
14. Memorize 5 Chinese idioms independently after school
15. Memorize 1 ancient poem independently after school
16. Learn about 1 history story independently and explain to dad or mom
17. Attend English class independently, do preview and review in advance
18. Return toys or books to their original places after use

### Default Prize Configuration

The system comes with multiple prizes, each with configurable probability.

### User Data Independence

- Each user has completely independent data:
  - Task list (customizable)
  - Points and statistics
  - Completion history
  - Spin history
  - Achievement progress

## ⚠️ Important Notes

### Usage Limitations

1. **Must Select User**: All operations (tasks, spins, etc.) require selecting a user first
2. **Local Data Storage**: Data is saved in browser local storage, clearing browser data will cause data loss
3. **Browser Compatibility**: Recommended to use modern browsers (Chrome, Firefox, Safari, Edge)

### Operation Tips

1. **Switch Date**: When viewing historical dates, the task list becomes read-only mode
2. **Task Editing**: Tasks can only be edited when viewing today
3. **Insufficient Points**: Cannot spin if points are insufficient, will show notification
4. **Deletion Restrictions**: Must keep at least 1 user and 1 task

### Data Backup

To backup data:
1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Find Local Storage
4. Export relevant data

### Frequently Asked Questions

**Q: How to reset a user's data?**  
A: You can delete the user and re-add them in user management, or clear all data.

**Q: Where to view spin history?**  
A: Click the "📊 Statistics" button at the bottom of the page, scroll down in the pop-up dialog to see "🎰 Spin History".

**Q: How to modify prize configuration?**  
A: Prize configuration is hidden (can be displayed through developer tools), mainly used to set prize probability and restriction rules.

**Q: Will data be lost?**  
A: Data is saved in browser local storage, clearing browser cache or using private mode may cause data loss. Regular backup is recommended.

## 📝 Update Log

### Current Version Features
- ✅ Multi-user management system
- ✅ Task management and points system
- ✅ Wheel spin functionality
- ✅ Completion reward mechanism
- ✅ Consecutive completion rewards
- ✅ 50 achievement badges
- ✅ History viewing
- ✅ Spin history records
- ✅ Calendar functionality
- ✅ Statistics information
- ✅ Responsive design

## 📞 Technical Support

If you have questions or suggestions, please check:
1. Browser console for error messages (press F12 to open)
2. Whether a user is selected
3. Whether data is saved correctly

---

**Enjoy using!** 🎉

