import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  greenPercentage: number = 50;
  rosePercentage: number = 30;
  redPercentage: number = 20;

  barPercentage1: number = 90;
  barPercentage2: number = 80;
  barPercentage3: number = 70;
  barPercentage4: number = 60;
  barPercentage5: number = 50;

  leadStatuses: any[] = [
    { label: 'Contact made', count: 10 },
    { label: 'Initial inerest', count: 20 },
    { label: 'First intro meeting', count: 15 },
    { label: 'Follow up meeting', count: 5 },
    { label: 'Workshop stage', count: 8 }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
