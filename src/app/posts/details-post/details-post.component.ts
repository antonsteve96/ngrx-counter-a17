import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {PostsStore} from "../state/posts.state";

@Component({
  selector: 'app-details-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-post.component.html',
  styleUrl: './details-post.component.scss'
})
export class DetailsPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  id = signal<number>(0);
  postsStore = inject(PostsStore);

  ngOnInit(): void {
    this.id.set(Number(this.route.snapshot.params['id']));
  }

}
