function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return this;
  }
  
  function createTimeOutEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return this;
  }
  
  function hoursWorkedOnDate(specificDate) {
    let timeIn = this.timeInEvents.find(event => event.date === specificDate);
    let timeOut = this.timeOutEvents.find(event => event.date === specificDate);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(specificDate) {
    let hoursWorked = this.hoursWorkedOnDate(specificDate);
    return hoursWorked * this.payPerHour;
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => {
      return totalPayroll + employee.allWagesFor();
    }, 0);
  }  

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

