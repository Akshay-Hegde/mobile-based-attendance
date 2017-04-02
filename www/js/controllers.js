angular.module('starter.controllers', [])

  .controller('RegisterCtrl', function ($scope, $firebaseArray, $localForage, $ionicPopup) {
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
      selDep: ''
    });
    var root = firebase.database().ref();
    // console.log("Firebase", $firebaseArray(root));
    var RegisterKey = 'Register' + ' ' + new Date().toDateString();
    $scope.selectedDepartment = function (dep) {
      rc.selDep = dep;
      rc.sections = _.filter(sections, function (val) {
        return val.department == dep
      })
    };
    $scope.selectedSection = function (dep, sec) {
      rc.selSec = sec;
      $localForage.getItem(RegisterKey+dep+sec).then(function (data) {
        if (data) {
          rc.local = data;
        }
        else {
          rc.local = {}
        }
      });
      rc.students = _.filter(students, function (val) {
        return val.department == dep && val.section == sec
      })
    };
    function submit() {
      console.info("local", rc.local, rc.selSec);
      if (rc.selSec == rc.local.section) {
        console.error("Already submitted!");
        $scope.showAlert("Already Submitted", "Today's attendance done for this section")
      }
      else {
        rc.local = {
          submitted: true,
          record: rc.students,
          section: rc.selSec
        };
        $localForage.setItem(RegisterKey+rc.selDep+rc.selSec, rc.local);
        console.log("students", rc.students)
      }
    }

    $scope.showAlert = function (title, text) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: text
      });
    };

    var students = [
      {
        name: 'Anjali',
        roll: '1',
        section: 'Girls A',
        department: 'BCA',
        present: false
      },
      {
        name: 'Ankita',
        roll: '2',
        section: 'Girls A',
        department: 'BCA',
        present: false
      },
      {
        name: 'Anuradha',
        roll: '3',
        section: 'Girls A',
        department: 'MCA',
        present: false
      },
      {
        name: 'Dhara',
        roll: '4',
        section: 'Girls B',
        department: 'MCA',
        present: false
      }
    ];
    var sections = [
      {
        id: 1,
        label: 'Girls A',
        department: 'BCA'
      },
      {
        id: 2,
        label: 'Girls B',
        department: 'BCA'
      },
      {
        id: 3,
        label: 'Boys A',
        department: 'BCA'
      },
      {
        id: 4,
        label: 'Girls B',
        department: 'MCA'
      },
      {
        id: 5,
        label: 'Girls A',
        department: 'MCA'
      }
    ]
  })

  .controller('ViewCtrl', function ($scope, $localForage) {
    var vc = angular.extend(this, {});
    var root = firebase.database().ref();
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
