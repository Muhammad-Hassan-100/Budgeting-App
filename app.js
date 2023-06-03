let totalAmount = document.getElementById("Total_Amount");
let setBudgetButton = document.getElementById("Set_Budget_Button");
let expenseAmount = document.getElementById("expense_amount");
let expenseDate = document.getElementById("expense_date");
let addExpenseButton = document.getElementById("add_expense");
let title = document.getElementById("title");
let inputExpenseError = document.getElementById("input_expense_error");
let inputBudgetError = document.getElementById("input_budget_error");
let budgetAmount = document.getElementById("budget_amount");
let expenditureValue = document.getElementById("expenditure_value");
let balanceAmount = document.getElementById("balance_amount");
let budgetList = document.getElementById("budget_list");
let tempAmount = 0;

// Set Budget Part
setBudgetButton.addEventListener("click", function () {
      tempAmount = totalAmount.value;
      // Empty or negative input
      if (tempAmount === "" || tempAmount < 0) {
            inputBudgetError.classList.remove("hide");
      } else {
            inputBudgetError.classList.add("hide");
            // Set Budget
            budgetAmount.innerText = tempAmount;
            // Set Balance
            balanceAmount.innerText = tempAmount - expenditureValue.innerText;
            // Clear Input Box
            totalAmount.value = "";
      }
});

// Function To Disable Edit and Delete Button
function disableButtons(bool) {
      let editButtons = document.getElementsByClassName("edit");
      Array.from(editButtons).forEach(function (element) {
            element.disabled = bool;
      });
}

// Function To Modify List Elements
function modifyElement(element, edit = false) {
      let parentDiv = element.parentElement;
      let currentBalance = balanceAmount.innerText;
      let currentExpense = expenditureValue.innerText;
      let parentAmount = parentDiv.querySelector(".amount").innerText;
      if (edit) {
            let parentText = parentDiv.querySelector(".product").innerText;
            title.value = parentText;
            expenseAmount.value = parentAmount;
            disableButtons(true);
      }
      balanceAmount.innerText = parseInt(currentBalance) + parseInt(parentAmount);
      expenditureValue.innerText =
            parseInt(currentExpense) - parseInt(parentAmount);
      parentDiv.remove();
}

// Function To Create List
function listCreator(expenseName, expenseValue, expenseDate) {
      let sublistContent = document.createElement("div");
      sublistContent.classList.add("sublist-content", "flex-space");
      budgetList.appendChild(sublistContent);
      sublistContent.innerHTML = '<p class="product">' + expenseName + '</p><p class="amount">' + expenseValue + '</p><p class="date">' + expenseDate + '</p>';
      let editButton = document.createElement("button");
      editButton.classList.add("edit");
      // editButton.innerHTML = '<img src="edit-icon.png" alt="Edit">';
      editButton.innerHTML = 'Edit';
      editButton.addEventListener("click", function () {
            modifyElement(editButton, true);
      });

      let deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      // deleteButton.innerHTML = '<img src="./images./Delete.png" alt="Delete">';
      deleteButton.innerHTML = 'Delete';
      deleteButton.addEventListener("click", function () {
            modifyElement(deleteButton);
      });
      sublistContent.appendChild(editButton);
      sublistContent.appendChild(deleteButton);
      budgetList.appendChild(sublistContent);
}

// Function To Add Expenses
addExpenseButton.addEventListener("click", function () {
      // Empty checks
      if (!expenseAmount.value || !title.value || !expenseDate.value) {
            inputExpenseError.classList.remove("hide");
            return false;
      }
      // Enable buttons
      disableButtons(false);
      // Expense
      let expenditure = parseInt(expenseAmount.value);
      // Total expense (existing + new)
      let sum = parseInt(expenditureValue.innerText) + expenditure;
      expenditureValue.innerText = sum;
      // Total balance (budget - total expense)
      const totalBalance = tempAmount - sum;
      balanceAmount.innerText = totalBalance;
      // Create list
      listCreator(title.value, expenseAmount.value, expenseDate.value);
      // Empty inputs
      title.value = "";
      expenseAmount.value = "";
      expenseDate.value = "";
});
