import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { Product,ProductService, Comment } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    // private productTitle: string;
    product:Product;
    comments: Comment[];
    newComment: string = "";
    newRating: number = 5;
    private isCommentHidden: boolean = true;

  constructor(private routeInfo: ActivatedRoute, private productService:ProductService) { }

  ngOnInit() {
      // 参数订阅
      // this.routeInfo.params.subscribe((params: Params) => this.productTitle = params["title"]);

      let productId:number = this.routeInfo.snapshot.params["productId"];
      this.product = this.productService.getProduct(productId);
      this.comments = this.productService.getCommentsForProductId(productId);
  }
  addComment(){
    let comment = new Comment(0, this.product.id,new Date().toISOString(),"somebody",this.newRating,this.newComment);
    this.comments.unshift(comment);
    
    let sum = this.comments.reduce((sum,comment) => sum + comment.rating,0);
    this.product.rating = sum / this.comments.length;


    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }

}
