import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { endPoint } from '../shared/baseURL';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private HttpClient:HttpClient,
    private AuthService:AuthService
  ) {

  }

  addItemToStorage(product: Product, quantity: number){

    let localStorageCart:any = localStorage.getItem('_cart');

    let _cart = JSON.parse(localStorageCart);

    if(!_cart){
      let _product = {
        ...product,
        quantity: quantity
      }

      return localStorage.setItem("_cart", JSON.stringify([_product]));
    }else{
      for(let i = 0; i<_cart.length; i++){
        if(_cart[i]._id === product._id){
          _cart[i].quantity += quantity;
          return localStorage.setItem("_cart", JSON.stringify(_cart));
        }
      }
      let _saveCart = [..._cart];
      _saveCart.push({
        ...product,
        quantity: quantity
      })
      return localStorage.setItem("_cart", JSON.stringify(_saveCart));
    }

  }

  getCart(){
    let localStorageCart:any = localStorage.getItem('_cart');

    return localStorageCart;
  }

  order(_order:any){
    if(!this.AuthService.user) return;
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.AuthService.user}`),

    }
    return this.HttpClient.post(endPoint + '/admin/orders', _order, header);
  }

  removeItem(id: string){

    let localStorageCart:any = localStorage.getItem('_cart');

    let _cart = JSON.parse(localStorageCart);

    for(let i = 0; i<_cart.length; i++){
      if(_cart[i]._id === id){
        _cart.splice(i, 1);
        return localStorage.setItem("_cart", JSON.stringify(_cart));
      }
    }
    console.log(_cart);
    return;
  }

}
