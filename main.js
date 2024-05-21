(function () {
  "use strict";

  class Calculator {
    constructor() {
      this.el = function (element) {
        if (element.charAt(0) === "#") {
          return document.querySelector(element);
        }
        return document.querySelectorAll(element);
      };

      this.viewer = this.el("#viewer");
      this.equals = this.el("#equals");
      this.nums = this.el(".num");
      this.ops = this.el(".ops");
      this.theNum = "";
      this.oldNum = "";
      this.resultNum;
      this.operator;
      this.initialize();
    }

    setNum(event) {
      const target = event.target;
      if (this.resultNum) {
        this.theNum = target.getAttribute("data-num");
        this.resultNum = "";
      } else {
        this.theNum += target.getAttribute("data-num");
      }
      this.viewer.innerHTML = this.theNum;
    }

    moveNum(event) {
      const target = event.target;
      this.oldNum = this.theNum;
      this.theNum = "";
      this.operator = target.getAttribute("data-ops");
      this.equals.setAttribute("data-result", "");
    }

    displayNum() {
      this.oldNum = parseFloat(this.oldNum);
      this.theNum = parseFloat(this.theNum);

      switch (this.operator) {
        case "plus":
          this.resultNum = this.oldNum + this.theNum;
          break;

        case "minus":
          this.resultNum = this.oldNum - this.theNum;
          break;

        case "times":
          this.resultNum = this.oldNum * this.theNum;
          break;

        case "divided by":
          this.resultNum = this.oldNum / this.theNum;
          break;

        default:
          this.resultNum = this.theNum;
      }

      if (!isFinite(this.resultNum)) {
        if (isNaN(this.resultNum)) {
          this.resultNum = "Ти все зламав";
        } else {
          this.resultNum = "ділити на 0...";
          this.el("#calculator").classList.add("broken");
          this.el("#reset").classList.add("show");
        }
      }

      this.viewer.innerHTML = this.resultNum;
      this.equals.setAttribute("data-result", this.resultNum);

      this.oldNum = 0;
      this.theNum = this.resultNum;
    }

    clearAll() {
      this.oldNum = "";
      this.theNum = "";
      this.viewer.innerHTML = "0";
      this.equals.setAttribute("data-result", this.resultNum);
    }

    initialize() {
      for (let i = 0, l = this.nums.length; i < l; i++) {
        this.nums[i].addEventListener("click", this.setNum.bind(this));
      }

      for (let i = 0, l = this.ops.length; i < l; i++) {
        this.ops[i].addEventListener("click", this.moveNum.bind(this));
      }
      this.equals.addEventListener("click", this.displayNum.bind(this));

      this.el("#clear").addEventListener("click", this.clearAll.bind(this));
    }
  }

  new Calculator();
})();
