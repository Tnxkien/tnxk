import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { FormGroup, FormControl } from '@angular/forms';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit{

  public Cart: Array<any>=[];

  constructor(
    private _AuthService:AuthService,
    private _CartService:CartService,
    private messageService: MessageService
  ){}

  public totalCart = 0;

  public user!: any;
  ngOnInit(): void {
    this._AuthService.userSubject$.subscribe((token: String)=>{
      let _token;
      if(token == ""){
        _token = this._AuthService.user;
      }else{
        _token = token;
      }
      if(!_token) return;
      this._AuthService.getProfile(_token)?.subscribe((res:any)=>{
        if(res.role === "admin") {
          // location.href = "http://localhost:3000/admin/product/index";
          return;
        }else{
          this.user = res;
          this.displayBasic = false;
        }
      },(err)=>{
        console.log(err);
      })
    });
    this.items = [
      {label: 'Step 1'},
      {label: 'Step 2'},
      {label: 'Step 3'}
  ];
  }
  title = 'Client';

  public displayBasic = false;

  showDialog() {
    this.displayBasic = true;
  }

  public displayBasicRegister = false;

  showDialogRegister(){
    this.displayBasicRegister = true;
  }

  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login(){
    this._AuthService.login(this.profileForm.value).subscribe((res:any)=>{
      console.log(res);
      if(res.kq == 0) return this.messageService.add({severity:'error', summary: 'Error', detail: `${res.msg}`});
      this._AuthService.userSubject$.next(res.token);
      localStorage.setItem('_token', res.token);
    })
  }

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
  })

  register(){
    this._AuthService.register(this.registerForm.value).subscribe((res)=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Đăng ký thành công!'});
      this.displayBasicRegister = false;
    },(err)=>{
      console.log(err)
      this.messageService.add({severity:'error', summary: 'Error', detail: `${err.error.message}`});
    })
  }

  logOut(){
    this._AuthService.userSubject$.next("");
    localStorage.removeItem("_token");
    localStorage.removeItem("_cart");
    this.user = undefined;
    window.location.reload();
  }

  visibleSidebar2: boolean  = false;

  public displayInfo: boolean = false;

  openCart(){
    this.totalCart = 0;
    this.Cart = JSON.parse(this._CartService.getCart())
    if(this.Cart){
      for(let i = 0; i<this.Cart.length; i++){
        this.totalCart += this.Cart[i].price*this.Cart[i].quantity;
      }
    };
    this.visibleSidebar2 = true;
  }

  openPay(){
    this.visibleSidebar2 = false;
    this.displayInfo = true;
  }

  items: any = [];

  infoForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
  });

  datHang(){
    let _order = {
      ...this.infoForm.value,
      products: this.Cart,
      total: this.totalCart
    }
    this._CartService.order(_order)?.subscribe((res)=>{
      if(res){
        localStorage.removeItem("_cart");
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Đặt hàng thành công!'});
        this.displayInfo = false;
        // location.href = '/'
      }
    })
  }

  removeItem(id: string){
    this._CartService.removeItem(id);
    this.Cart = JSON.parse(this._CartService.getCart());
  }


}
