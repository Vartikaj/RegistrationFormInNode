import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardDataService } from 'src/app/services/dashboard-data.service';
@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.scss']
})
export class DashboardPanelComponent implements OnInit {
  customData: any;
  responseData: any;
  constructor (
    private route : ActivatedRoute,
    private dashboardService : DashboardDataService,
  ) { }
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const navigationState = window.history.state;
      console.log(navigationState.customData);
      const navigationjson = JSON.stringify(navigationState.customData);
      const navigationParseData = JSON.parse(navigationjson);
      this.customData = navigationParseData;

      this.dashboardService.findData(this.customData).subscribe((response) => {
        console.log(response);
        const navigationjsontext = JSON.stringify(response);
        const navigationParseDatatext = JSON.parse(navigationjsontext);
        this.responseData = navigationParseDatatext;
      });

    })
  }

}
