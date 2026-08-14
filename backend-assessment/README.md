# VeeLion Backend Assessment (Express.js)

## Overview

You are given a partially implemented backend for a **Task Management System** built with Express.js.

The project contains **two modules**:

* A **Tasks API**
* An **Activity Log API**

Your goal is to:

1. Review the existing code
2. Identify strengths and weaknesses
3. Improve the problematic parts
4. Implement a new module that integrates with the existing system

---

## Objectives

This assessment evaluates your ability to:

* **Read and understand** existing code
* **Critically review** code quality
* **Refactor and improve** code safely
* **Design and implement** new features

---

## What You Are Given

* Express.js project

* Two modules:

  * Tasks API
  * Activity Log API

* Data is stored in local JSON files (no database)

---

## Your Tasks

### 1. Code Review

Create a file named:

```
REVIEW.md
```

In it, document:

* All the findings you may want to discuss
* Categorize issues into:

  * Bugs
  * Performance
  * Maintainability
  * Security
  * Code quality

For each issue:

* Explain **what is wrong**
* Explain **why it is a problem**
* Suggest **how to improve it**

---

### 2. Refactor Both Modules

Improve the existing modules

**Important**:

* Don't rewrite everything from scratch
* Maintain existing functionality


---

### 3. Implement a New Module (Reports API)

Create a new module:

```
GET /reports/tasks-summary
```

### Expected Response Example:

```json
{
  "total": 20,
  "byStatus": {
    "todo": 5,
    "in-progress": 10,
    "done": 5
  },
  "recentActivityCount": 12
}
```

### Requirements:

* Read data from both:

  * Tasks JSON
  * Activity JSON
* Aggregate and return meaningful insights
* Follow a clean architecture

---

## Constraints

* Use JSON files only
* Keep the project simple and maintainable
* Assume this code is already in production

---


## Submission Instructions

1. Create a **public GitHub repository**

2. Push the project after your improvements / additions

3. Ensure your repo includes:

   * Updated code
   * `REVIEW.md`
   * Clear commit history

4. Share the repository link

---

## Time Expectation

* Expected time: **~2 days**

---

## AI Usage

You are allowed to use AI tools, but not copy-pasting this document and just pushing the output.

However, you are evaluated on:

* Your understanding of the code
* Your ability to critique and improve it
* Your decision-making



