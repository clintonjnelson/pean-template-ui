import { Component, OnInit } from '@angular/core';
import { ApiDashboardService } from '../../core/api/api-dashboard.service';


@Component({
  moduleId: module.id,
  selector: 'sign-time-chart',
  templateUrl: 'user-dashboard.component.html',
  styleUrls:  ['user-dashboard.component.css']
})


export class UserDashboardComponent implements OnInit {
  // These objects are expanded with a sub-object for each chart & are populated via functions
  chartData:  any;
  dateCounts: any;
  isProcessing: any;

  constructor(private apiDashboardService: ApiDashboardService) {
    if((<any>window).Chart) {
      console.log("SETTING CHART COLORS");
      (<any>window).Chart.defaults.global.defaultFontColor = '#ffffff';
    }
    this.dateCounts = {};
    this.chartData  = {};
    this.isProcessing = {};
    this.isProcessing['userPageViewsChart'] = true;
  }

  ngOnInit() {
    const that = this;
    const userId = window.localStorage.getItem('userId');
    console.log("CALLING API...");
    this.apiDashboardService.getInteractions('getUserPageInteractions')
        .subscribe( interactions => {
          this.chartData.userPageViewsChart  = this.buildChart('Visitors to Your Syynpost', '#ffffff');
          this.dateCounts.userPageViewsChart = this.resetDateCountsAndPopulateChartXAxisLabels(interactions, this.chartData.userPageViewsChart);
          this.buildLine(interactions, this.dateCounts.userPageViewsChart, this.chartData.userPageViewsChart);
          this.isProcessing.userPageViewsChart = false;
        },
        error => {
          console.log("ERROR RETURNED FROM INTERACTIONS: ", error.toJson());
        });

    this.apiDashboardService.getInteractions('')
  }

  buildChart(lineLabel: string, lineColor: string) {
    let chartData = {};
    // configure & build chart
    chartData['line']    = [{ data: [], label: lineLabel }]; // {[data: <y-points>, label: 'labelname']
    chartData['labels']  = [];
    chartData['options'] = {  responsive: true,
                                legend: {
                                  labels: {
                                    fontColor: lineColor
                                  }
                                },
                                scales: {
                                  xAxes: [{
                                    type: 'time',
                                    time: {
                                      unit: 'day',
                                      displayFormats: {
                                        day: 'YYYY-MM-DD',
                                        max: new Date().toISOString().substring(0,10),
                                      }
                                    },
                                    gridLines: {
                                      display: true,
                                      color: '#c0c0c0'
                                    }
                                  }],
                                  yAxes: [{
                                    ticks: {
                                      min: 0,
                                      userCallback: function(tick) {
                                        // Keep only whole number yAxis ticks
                                        if(Math.floor(tick) === tick) { return tick; }
                                      }
                                    },
                                    gridLines: {
                                      display: true,
                                      color: '#C0C0C0'
                                    }
                                  }],
                                }
                              };
    chartData['type']    = 'line';
    chartData['legend']  = true;
    chartData['colors']  = [{
      backgroundColor: '#d3d3d3',
      borderColor: 'rgba(255,255,255,0)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];
    return chartData;
  }

  buildLine(apiInteractions: any, dateCounts: any, chartData: any) {
    // Build count object
    apiInteractions.forEach(function(dataPoint) {
      const date = dataPoint.createdAt.substring(0, 10);
      dateCounts[date]++;
    });
    // set point counts in same order as labels
    chartData.labels.forEach(function(date) {
      chartData.line[0].data.push(dateCounts[date]);
    });

  }

  // chartDataRef is a passed reference object to modify within here
  resetDateCountsAndPopulateChartXAxisLabels(apiInteractions: any, chartDataRef: any) {
    let dateCounts = {};
    const startDateStr = new Date(apiInteractions[0].createdAt).toISOString().substring(0, 10);
    const stopStr      = new Date().toISOString().substring(0, 10);  // through now

    let currDateStr = startDateStr;  // initial value is first date
    while(currDateStr <= stopStr) {
      console.log("DATE IS NOW: ", currDateStr);
      dateCounts[currDateStr] = 0;                                      // set object of all counts
      chartDataRef.labels.push(currDateStr);                               // push in each date for x-axis

      let date    = new Date(currDateStr);
      currDateStr = new Date(date.setDate(date.getDate() + 1)).toISOString().substring(0, 10);  // increment
    }
    console.log("BLANK DATE COUNT BUILT: ", dateCounts);
    return dateCounts;
  }



  hovered() {
    console.log("HOVER!");
  }
  clicked() {
    console.log("CLICKED");
  }
}


