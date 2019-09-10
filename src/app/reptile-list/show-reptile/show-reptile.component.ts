import { Component, OnInit } from '@angular/core';
import { Reptile } from '../../models/reptile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReptilesService } from '../../services/reptiles.service';

@Component({
  selector: 'app-show-reptile',
  templateUrl: './show-reptile.component.html',
  styleUrls: ['./show-reptile.component.scss']
})
export class ShowReptileComponent implements OnInit {

  reptile: Reptile;

  constructor(private route: ActivatedRoute, private reptilesService: ReptilesService,
              private router: Router) {}

  ngOnInit() {
    this.reptile = new Reptile('', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.reptilesService.getShowReptile(+id).then(
      (reptile: Reptile) => {
        this.reptile = reptile;
      }
    );
  }

  onBack() {
    this.router.navigate(['/reptiles']);
  }

}
