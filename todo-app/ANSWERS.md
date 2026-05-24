# ANSWERS

## 1. How to run

Run:

```bash
npm install
node app.js
```

Then open localhost:3000

---

## 2. Stack choice

I chose Node.js, Express, and SQLite because they are lightweight, beginner-friendly, and good for building persistent CRUD apps quickly.

A worse choice would have been using a complex microservice architecture because the project requirements are small.

---

## 3. One real edge case

The app prevents users from creating empty todos.

File:
app.js line 45

Without this handling, blank todos could be stored in the database.

---

## 4. AI usage

I used ChatGPT for:
- CRUD route structure
- SQLite setup guidance
- README formatting

I modified generated code by adding validation and improving route organization.

---

## 5. Honest gap

The UI is basic and not mobile responsive.

With another day, I would improve responsiveness and add authentication.