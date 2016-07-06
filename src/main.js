var Row = Vue.extend({
  template: '<tr><td>{{row.user}}</td><td>{{row.job}}</td></tr>',
  props: ['row']
})

new Vue({
  el: '#timetable',
  components: {
    'row': Row
  },
  data: {
    users: [
      'Temi',
      'Weronica',
      'Reece',
      'Vil',
      'Elias'
    ],
    jobs: [
      'Hallway / Pfand',
      'Shopping',
      'Kitchen',
      'Bathroom',
      'Off'
    ]
  },
  computed: {
    startOfWeek: function () {
      return moment().startOf('week').add(1, 'days').format('MMM Do YY')
    },
    endOfWeek: function () {
      return moment().endOf('week').add(1, 'days').format('MMM Do YY')
    },
    rows: function () {
      var now = moment().add(-1, 'weeks')
      var diff = Math.abs(moment('20160627', 'YYYYMMDD').diff(now, 'days'))
      var rows = []

      for (var i = diff; i >= 7; i = i - 7) {
        this.jobs.push(this.jobs.shift())
      }

      for ( var i = 0; i < this.users.length; i++) {
        rows.push({
          'user': this.users[i],
          'job': this.jobs[i]
        })
      }

      return rows
    }
  },
  init: function () {}
})
