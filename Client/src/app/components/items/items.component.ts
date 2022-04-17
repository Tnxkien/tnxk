import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(
    private ProductService:ProductService,
    private ActivatedRoute:ActivatedRoute
  ) { }

  public products: Array<Product> = [];
  private slug!: string | null;

  ngOnInit(): void {
    this.slug = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.ProductService.getAllProductSlug(this.slug).subscribe((res:any)=>{
      this.products = res;
    })
  }

}
