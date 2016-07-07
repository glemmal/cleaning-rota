var data = {
  users: [
    'Reece',
    'Temi',
    'Vil',
    'Weronica',
    'Elias'
  ],
  jobs: [
    'Shopping',
    'Off',
    'Kitchen',
    'Hallway / Pfand',
    'Bathroom'
  ]
}

var App = (function (data) {
  var Row = Vue.extend({
    template: '<tr><td>{{row.user}}</td><td>{{row.job}}</td></tr>',
    props: ['row']
  })

  new Vue({
    el: '#timetable',
    components: {
      'row': Row
    },
    data: data,
    computed: {
      startOfWeek: function () {
        return moment().startOf('week').add(1, 'days').format('MMM Do YY')
      },
      endOfWeek: function () {
        return moment().endOf('week').add(1, 'days').format('MMM Do YY')
      },
      rows: function () {
        var now = moment()
        var diff = Math.abs(moment('20160704', 'YYYYMMDD').diff(now, 'days')) + 1
        var rows = []

        for (var i = diff; i >= 7; i = i - 7) {
          this.jobs.unshift(this.jobs[this.jobs.length - 1])
          this.jobs.pop()
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
})

App(data)
