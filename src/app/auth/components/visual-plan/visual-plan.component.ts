import { Component, Input } from '@angular/core';
import { Plan } from 'src/app/admin/interfaces/plan';

@Component({
  selector: 'app-visual-plan',
  templateUrl: './visual-plan.component.html',
  styleUrl: './visual-plan.component.css'
})
export class VisualPlanComponent {

  @Input()
  visualPlan?: Plan;

}
