import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [],
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.scss'
})
export class ViewSnippetComponent {
  codeSnippet = {title:"",code:""};

  constructor(private dbServ:DbService,private actRoute:ActivatedRoute) {}

  ngOnInit() {
    const docId = this.actRoute.snapshot.paramMap.get('id');
    this.dbServ.getSnippetById(docId!).then((data:any)=>{
      console.log(data)
      this.codeSnippet = data;
    })
  }
}
