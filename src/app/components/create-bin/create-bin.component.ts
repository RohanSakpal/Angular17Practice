import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
export class Snippet {
  title!:string
  code!:string
}
@Component({
  selector: 'app-create-bin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-bin.component.html',
  styleUrl: './create-bin.component.scss'
})
export class CreateBinComponent {

  constructor(private dbSev:DbService) {}

  title = new FormControl("", [
    Validators.required
  ])

  code = new FormControl("", [
    Validators.required
  ])

  binForm = new FormGroup({
    title : this.title,
    code : this.code
  })

  async Create() {
    console.log(this.binForm.value);
    await this.dbSev.createSnippet(this.binForm.value as Snippet);
    this.reset();
  }
  reset() {
    this.binForm.reset();
  }
}
