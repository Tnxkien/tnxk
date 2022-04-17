import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-other-prodcut',
  templateUrl: './other-prodcut.component.html',
  styleUrls: ['./other-prodcut.component.scss']
})
export class OtherProdcutComponent implements OnInit {

  constructor(
    private ProductService:ProductService
  ) { }

  public products: Array<Product> = [];

  ngOnInit(): void {
    this.ProductService.getOtherProduct().subscribe((res:any)=>{
      this.products = res;
    })
  }

}
