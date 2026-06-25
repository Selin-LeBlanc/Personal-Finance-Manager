# Personal-Finance-Manager

Personal Finance Manager Technical Challange

MVP

- Account management: manage multiple personal accounts (for example, checking, savings, credit) and store transactions for each account.
- Account balances: view current balance per account and retrieve historical balances at a selected date/time.
- Monthly expense reporting: view a monthly report of expenses grouped by category.
- Planned cash flow: store future bills and expected income, and view projected total budget balance.
- Project-based tracking: tag expenses by project (for example, house remodeling or a trip) and view project-specific totals.

Nice to Have's if I have time

- Account balance roll over so the balance calculations dont have to go through the whole db entries.
- reversal of a journal entry, may not have time
- a draft entry option where users can create journal lines that are editable until recorded
- I'm leaving the reporting category and project categorization the last
- a seperate transaction date (means there will only be journal entry created and updated date)
- Create a shared error messages file

Excluding:

- creation of new accounts
- createdBy / updatedBy info
- a field for reference number
- Multuple fund/estate management

Journal Line,
Journal Entry,
Account,
Project,
Reporting Category.

Journal entries and Journal lines are the core of the app.

1 journal entry is a result of a business action.
1 journal entry may have multiple journal lines.
1 account may have multiple journal lines.
1 project may have multiple journal lines.
1 reporting category may have multiple journal lines.
