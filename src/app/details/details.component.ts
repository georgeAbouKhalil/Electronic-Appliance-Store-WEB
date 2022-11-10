import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private userService: UsersService) { }
  userName:String=""
  c1:String = "https://i.imagesup.co/images2/49edb7cc8a8695d0998291d75478238e299efcf4.jpg"
  c2:String = "https://i.imagesup.co/images2/79dc823017280ae61b1b4d4aefe1ca8e860a0872.jpg"
  c3:String = "https://i.imagesup.co/images2/27b5a97061b0161aff676294539bc43a243e80b8.jpg"
  c4:String = "https://i.imagesup.co/images2/dc8d213f5390f9da01533c43f27150db0a7e4569.jpg"
  text:String = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque."
  card:String = "https://tms.co.il/catalog/view/theme/default/image/cards.png"
  delivery:String = "https://tms.co.il/catalog/view/theme/default/image/delivery.png"
  score:String = "https://tms.co.il/catalog/view/theme/default/image/score.png"
  shield:String = "https://tms.co.il/catalog/view/theme/default/image/shield.png"
  fxp:String = "https://tms.co.il/catalog/view/theme/default/image/fxp.png"
  ngOnInit(): void {
    this.userName = this.userService.savedUserName
  }

}
