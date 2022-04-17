import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(
    private ProductService: ProductService,
    private AuthService:AuthService,
    private CartService:CartService
  ) { }

  @Input() product!: Product;

  // public product!: Product;
  public products: Array<Product> = [];

  ngOnInit(): void {
    this.ProductService.getAllProduct().subscribe((res:any)=>{
      this.products = res;
    })
    this.AuthService.userSubject$.subscribe((res)=>{
      this._isLogin = this.AuthService.user;
    })
  }

  displayBasic!: boolean;

  getDetailProduct(id: string) {
    this.ProductService.getDetailProduct(id).subscribe((res: any) => {
      this.product = res;
      this.images = [...res.img];
      this.displayBasic = true;
    })

    this.AuthService.userSubject$.subscribe((res)=>{
      this._isLogin = this.AuthService.user;
    })
  }

  public images!: any[];

  public _isLogin: any;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  addToCart(){
    this.CartService.addItemToStorage(this.product, 1);
    this.displayBasic = false;
  }

}
