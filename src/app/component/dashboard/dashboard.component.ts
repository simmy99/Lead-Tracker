import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData: any = {};
  leadStatuses: any[] = [];
  graphData: any[] = [];
  scalingFactor: number = 1;
  stageTypeCount: any[] = [];
  isHovered: boolean = false;
  leads: any[] = [];

  constructor(private loginService: LoginService, private router: Router) { }

  getBarHeight(leads: number): number {
    const maxLeads = Math.max(...this.graphData.map((item: any) => item.leads));
    const maxGraphHeight = 90; 
    const minGraphHeight = 10; 

    if (leads === 0) {
      return minGraphHeight; 
    }

    const calculatedHeight = (leads / maxLeads) * maxGraphHeight;
    return Math.min(calculatedHeight, maxGraphHeight);
  }

  getTotalValue(): number {
    return this.stageTypeCount.reduce((total, item) => total + item.value, 0);
  }

  getProgressBarColor(stageType: string): string {
    switch (stageType) {
      case 'won':
        return '#C9ECDC'; 
      case 'active':
        return '#F9D8F8'; 
      case 'lost':
        return '#F8CDD9'; 
      default:
        return 'gray'; 
    }
  }

  ngOnInit(): void {
    console.log('DashboardComponent ngOnInit called');

    const bearerToken = sessionStorage.getItem('bearerToken');
    const userId = sessionStorage.getItem('userId');
    console.log('Bearer Token:', bearerToken);
    console.log('User ID:', userId);

    // Fetch user data using the service
    if (bearerToken !== null) {
      this.loginService.getUserData(bearerToken, userId || '').subscribe(
        (data) => {
          console.log('API Response:', data);
          this.userData = data;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );

      // Fetch lead status data using the service
      this.loginService.getLeadStatuses(bearerToken, userId || '').subscribe(
        (data) => {
          this.leadStatuses = data.data.results.map((status: any) => ({
            label: status.name,
            count: status.lead_count
          }));
        },
        (error) => {
          console.error('Error fetching lead status data:', error);
        }
      );

      // Fetch graph data using the service
      this.loginService.getGraphData(bearerToken, userId || '').subscribe(
        (data) => {
          this.graphData = data.data.graph;

          const maxLeads = Math.max(...this.graphData.map(item => item.leads));

          // Calculate the scaling factor
          const maxBarHeight = 100; // Maximum height of the bars in pixels
          this.scalingFactor = maxBarHeight / maxLeads;
        },
        (error) => {
          console.error('Error fetching graph data:', error);
        }
      );

      this.loginService.getGraphData(bearerToken, userId || '').subscribe((response) => {
        if (response && response.data) {
          this.graphData = response.data.graph;
          this.stageTypeCount = response.data.stage_type_count;

          this.graphData.forEach((item) => {
            item.leads *= 10;
          });
  
          this.stageTypeCount.forEach((item) => {
            item.value *= 10;
          });
        }
      });

      this.loginService.getLeadList(bearerToken, userId || '').subscribe(
        (data) => {
          console.log('Lead List API Response:', data);
          this.leads = data.data.results; 
          console.log('Leads Data:', this.leads); 
        },
        (error) => {
          console.error('Error fetching lead table details:', error);
        }
      );   
    }
  }

  logout() {
    sessionStorage.removeItem('bearerToken');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
