import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  open(){
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
		modalRef.componentInstance.name = 'World';
  }

}
