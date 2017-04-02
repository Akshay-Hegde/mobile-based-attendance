angular.module('starter.services', [])

  .factory('db', function ($localForage) {

    var RegisterKey = 'Register' + ' ' + new Date().toDateString();

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
    ];

    return {
      getStudents: function () {
        return $localForage.getItem('students');
      },
      getSections: function () {
        return sections;
      },
      getData: function (dep, sec) {
        return $localForage.getItem(RegisterKey + dep + sec)
      },
      setData: function (dep, sec, data) {
        return $localForage.setItem(RegisterKey + dep + sec, data);
      },
      addStudent: function (newStudent) {
        $localForage.getItem('students')
          .then(function (data) {
            console.log(data);
            if (!data)
              data = [];
            data.push(newStudent);
            $localForage.setItem('students', data)
              .then(function () {
                console.log("new Data", data)
              })
          })
      },
      removeStudent: function (student) {
        $localForage.getItem('students')
          .then(function (data) {
            data = _.filter(data, function (key) {
              return student.roll != key.roll
            });
            $localForage.setItem('students', data)
              .then(function () {
                console.log("new Data", data);
              })
          })
      }
    };
  });

