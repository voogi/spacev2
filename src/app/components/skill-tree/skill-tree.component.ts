import {
   Component, ElementRef, OnInit
} from '@angular/core';


@Component({
  selector: 'space-skill-tree',
  templateUrl: './skill-tree.component.html',
  styleUrls: ['./skill-tree.component.css']
})
export class SkillTreeComponent implements OnInit {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {

  }


}
