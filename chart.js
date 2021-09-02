let formattedModuleInfos = moduleInfos.map(moduleInfo => {
    return {
        x: moduleInfo.name,
        y: [
            new Date(moduleInfo.start).getTime(),
            new Date(moduleInfo.end).getTime()
        ],
        fillColor: moduleInfo.color,
        credits: moduleInfo.credits.toString()
    }
})

console.log(formattedModuleInfos)

var options = {
    series: [
        {
            data: formattedModuleInfos,
        }
    ],
    chart: {
        height: 200,
        type: 'rangeBar'
    },
    plotOptions: {
        bar: {
            horizontal: true,
            distributed: true,
            dataLabels: {
                hideOverflowingLabels: false
            }
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function(val, opts) {
            var label = opts.w.globals.labels[opts.dataPointIndex]
            var a = moment(val[0])
            var b = moment(val[1])
            var diff = b.diff(a, 'days')
            return "Duree: " + diff + (diff > 1 ? ' days' : ' day')  + " | Credits: " + opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex].credits
        },
        style: {
            colors: ['#f3f4f5', '#fff'],
            fontSize: '12px',
        }
    },
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        show: true,
        labels: {
            minWidth: 100,
            maxWidth: 350
        },
    },
    grid: {
        row: {
            colors: ['#f3f4f5', '#fff'],
            opacity: 1
        }
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();