import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoadingImageService } from './service/loading-image.service';

import { Gifs, TagsCollection } from './view-models';

@UntilDestroy()
@Component({
	selector: 'view-image',
	templateUrl: './view-image.component.html',
	styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {
	constructor(private loadingImageService: LoadingImageService) {}

	isLoad$: Subject<boolean> = new Subject();

	isGroup = false;

	isComposite = false;

	tagCollectionSort: TagsCollection = {};

	tagCoolectionAll: TagsCollection = {
		all: []
	};

	viewTagCollection: TagsCollection = {};

	ngOnInit() {
		this.viewTagCollection = this.tagCoolectionAll;
	}

	loading(tags: string[]) {
		this.isLoad$.next(true);
		this.loadingImageService
			.loading(tags)
			.pipe(
				untilDestroyed(this),
				catchError(err => {
					this.isLoad$.next(false);
					return throwError(err);
				})
			)
			.subscribe(res => {
				this.isLoad$.next(false);
				if (res.error) return;
				this.addTag(res as Gifs);
			});
	}

	addTag(img: Gifs) {
		const allkey = 'all';
		if (
			Object.prototype.hasOwnProperty.call(
				this.tagCollectionSort,
				img.tagName
			)
		) {
			this.tagCollectionSort[img.tagName].push(img);
		} else {
			this.tagCollectionSort[img.tagName] = new Array(img);
		}
		this.tagCoolectionAll[allkey].push(img);
	}

	toggleGrouping(isGroup: boolean) {
		this.isGroup = isGroup;
		if (isGroup) {
			this.viewTagCollection = this.tagCollectionSort;
		} else this.viewTagCollection = this.tagCoolectionAll;
	}

	clearGallery() {
		this.tagCollectionSort = {};
		this.tagCoolectionAll = {
			all: []
		};
		this.viewTagCollection = {};
		if (this.isGroup) {
			this.viewTagCollection = this.tagCollectionSort;
		} else this.viewTagCollection = this.tagCoolectionAll;
	}
}
