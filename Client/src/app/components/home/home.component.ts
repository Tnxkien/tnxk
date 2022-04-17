import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private ProductService:ProductService,
    private AuthService:AuthService
  ) { }

  public products: Array<Product> = [];
  public _isLogin: any;
  ngOnInit(): void {
    this.ProductService.getAllProduct().subscribe((res:any)=>{
      this.products = res;
    })
    this.AuthService.userSubject$.subscribe((res)=>{
      this._isLogin = this.AuthService.user;
    })
  }

  getDetail(id: string){
    this.ProductService._idProductSubject$.next(id);
  }

}
