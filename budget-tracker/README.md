PROJECT NAME: Budget Tracker Application

PROJECT DESCRIPTION:The Budget Tracker application allows users to track their income, expenses, and savings goals. Users can set and update their income, record expenses, and manage their savings goals. The app provides smart insights and financial tips based on the user's spending habits and budget.

KEY FEATURES:
Track income and expenses

Set and manage savings goals

Receive smart insights based on budget performance

Store data locally in the browser to persist user data even after they log out

Save and retrieve data from local storage when logging back in

FEATURES:

Income Tracking: Users can set and update their income.

Expense Tracking: Users can add and categorize expenses.

Savings Goals: Users can set savings goals and track progress.

Smart Insights: Provides insights based on spending patterns.

Financial Tips: Displays tips to improve budgeting and saving.

Persistent Data: Data is saved locally in the browser to allow users to view their data when they log back in.

INSTALLATION:

To run this project locally, follow the following steps:

Clone this repository

https://github.com/PLMosetlha/alx-capstone-project/tree/main/budget-tracker

Navigate into the project folder:

cd budget-tracker

Install the required dependencies:

npm install

Start the development server:

npm run dev

Visit http://localhost:3000 in your browser to view the app.

Technologies Used
React: For building the user interface.

React Router: For routing between pages (such as login and dashboard).

Local Storage: For saving and retrieving user data locally.

CSS: For styling the application.

Usage
Login: Users can log into the app by entering their credentials (to be implemented as part of a login page).

Dashboard: Once logged in, users will see their dashboard where they can:

Set income

Add expenses

Set savings goals

Save Changes: After making changes, users can click the "Save Changes" button to store data locally.

Logout: Users can log out by clicking the "Logout" button. This redirects them to the login page, and their data remains saved in local storage.

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
