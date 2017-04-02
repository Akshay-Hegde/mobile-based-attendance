angular.module('starter.controllers', [])

  .controller('RegisterCtrl', function ($scope, $firebaseArray, $localForage, $ionicPopup, db) {
    var rc = angular.extend(this, {
      departments: [
        {
          id: 1,
          label: 'BCA'
        },
        {
          id: 2,
          label: 'BBA'
        },
        {
          id: 3,
          label: 'MCA'
        },
        {
          id: 4,
          label: 'MBA'
        }],
      sections: [],
      students: [],
      submit: submit,
      submitted: false,
      selSec: '',
      selDep: '',
      allstudents: [],
      allsections: db.getSections() || []
    });

    db.getStudents()
      .then(function (data) {
        rc.allstudents = data;
      });
    $scope.selectedDepartment = function (dep) {
      rc.selDep = dep;
      db.getData(dep, rc.selSec)
        .then(function (data) {
          if (data) {
            updateSections();
            rc.local = data;
            rc.students = data.record
          }
          else {
            rc.local = {};
            updateStudents();
            updateSections();
          }
        });
    };
    $scope.selectedSection = function (dep, sec) {
      rc.selSec = sec;
      db.getData(rc.selDep, sec)
        .then(function (data) {
          if (data) {
            rc.local = data;
            updateSections();
            rc.students = data.record
          }
          else {
            rc.local = {};
            updateStudents();
            updateSections();
          }
        });
    };
    $scope.showAlert = function (title, text) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: text
      });
    };

    function submit() {
      if (rc.selSec == rc.local.section) {
        $scope.showAlert("Already Submitted", "Today's attendance done for this section")
      }
      else {
        rc.local = {
          submitted: true,
          record: rc.students,
          section: rc.selSec
        };
        db.setData(rc.selDep, rc.selSec, rc.local)
          .then(function (data) {
          });
        $scope.showAlert("Submitted", "Successfully saved today's attendance");
      }
    }

    function updateStudents() {
      rc.students = _.filter(rc.allstudents, function (val) {
        return val.department == rc.selDep && val.section == rc.selSec
      });
    }

    function updateSections() {
      rc.sections = _.filter(rc.allsections, function (val) {
        return val.department == rc.selDep
      })
    }

  })

  .controller('ViewCtrl', function ($scope, db) {
    var vc = angular.extend(this, {
      departments: [
        {
          id: 1,
          label: 'BCA'
        },
        {
          id: 2,
          label: 'BBA'
        },
        {
          id: 3,
          label: 'MCA'
        },
        {
          id: 4,
          label: 'MBA'
        }],
      sections: [],
      students: [],
      submitted: false,
      selSec: '',
      selDep: '',
      allstudents: [],
      allsections: db.getSections() || []
    });

    db.getStudents()
      .then(function (data) {
        vc.allstudents = data;
      });
    $scope.selectedDepartment = function (dep) {
      vc.selDep = dep;
      db.getData(dep, vc.selSec)
        .then(function (data) {
          if (data) {
            updateSections();
            vc.local = data;
            vc.students = data.record
          }
          else {
            vc.local = {};
            updateStudents();
            updateSections();
          }
        });
    };
    $scope.selectedSection = function (dep, sec) {
      vc.selSec = sec;
      db.getData(vc.selDep, sec)
        .then(function (data) {
          if (data) {
            vc.local = data;
            updateSections();
            vc.students = data.record
          }
          else {
            vc.local = {};
            updateStudents();
            updateSections();
          }
        });
    };
    $scope.showAlert = function (title, text) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: text
      });
    };

    function updateStudents() {
      vc.students = _.filter(vc.allstudents, function (val) {
        return val.department == vc.selDep && val.section == vc.selSec
      });
    }

    function updateSections() {
      vc.sections = _.filter(vc.allsections, function (val) {
        return val.department == vc.selDep
      })
    }

  })

  .controller('AccountCtrl', function ($scope, db, newStudentEntry) {
    var ac = angular.extend(this, {
      departments: [
        {
          id: 1,
          label: 'BCA'
        },
        {
          id: 2,
          label: 'BBA'
        },
        {
          id: 3,
          label: 'MCA'
        },
        {
          id: 4,
          label: 'MBA'
        }],
      sections: [],
      students: [],
      submitted: false,
      selSec: '',
      selDep: '',
      allstudents: [],
      allsections: db.getSections() || [],
      removeStudent: removeStudent,
      openModal: openModal
    });

    db.getStudents()
      .then(function (data) {
        ac.allstudents = data;
      });
    $scope.selectedDepartment = function (dep) {
      ac.selDep = dep;
      db.getData(dep, ac.selSec)
        .then(function (data) {
          if (data) {
            updateSections();
            ac.local = data;
            ac.students = data.record
          }
          else {
            ac.local = {};
            updateStudents();
            updateSections();
          }
        });
    };
    $scope.selectedSection = function (dep, sec) {
      ac.selSec = sec;
      db.getData(ac.selDep, sec)
        .then(function (data) {
          if (data) {
            ac.local = data;
            updateSections();
            ac.students = data.record
          }
          else {
            ac.local = {};
            updateStudents();
            updateSections();
          }
        });
    };
    $scope.showAlert = function (title, text) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: text
      });
    };

    function updateStudents() {
      ac.students = _.filter(ac.allstudents, function (val) {
        return val.department == ac.selDep && val.section == ac.selSec
      });
    }

    function updateSections() {
      ac.sections = _.filter(ac.allsections, function (val) {
        return val.department == ac.selDep
      })
    }

    function removeStudent(student) {

    }

    function openModal() {
      var scope = newStudentEntry.scope;
      scope.acm = {
        newStudent: {
          roll: '',
          name: '',
          section: '',
          department: '',
          present: false
        },
        departments: ac.departments,
        selDep: '',
        selSec: '',
        allsections: db.getSections() || [],
        addStudent: addStudent,
        closeModal: closeModal,
        selectedDepartment: selectedDepartment,
        selectedSection: selectedSection
      };
      newStudentEntry.show();
      function selectedDepartment(dep) {
        scope.acm.selDep = dep;
        scope.acm.sections = _.filter(scope.acm.allsections, function (val) {
          return val.department == scope.acm.selDep
        })
      }

      function selectedSection(sec) {
        scope.acm.selSec = sec;
      }

      function closeModal() {
        newStudentEntry.hide();
      }

      function addStudent() {
        scope.acm.newStudent.section = scope.acm.selSec;
        scope.acm.newStudent.department = scope.acm.selDep;
        db.addStudent(scope.acm.newStudent);
        newStudentEntry.hide();
      }
    }
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  });
