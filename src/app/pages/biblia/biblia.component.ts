import { Component, OnInit } from '@angular/core';
import { BibliaService } from './biblia.service';


@Component({
  selector: 'app-biblia',
  templateUrl: './biblia.component.html',
  styleUrls: ['./biblia.component.css']
})
export class BibliaComponent implements OnInit {

  books: {name: string,abbrev: string}[] = [];
  book: {name: string,abbrev: string};
  chapters: Number[] = [];
  chapterNumber: Number;
  verses: any[] = [];
  idVerse: any;
  constructor(private service: BibliaService) { }

  ngOnInit(): void {
    this.getBooks()
  }

  getBooks(){
    this.service.requestBooks().toPromise().then((data) => {
      this.books = data;
    } 
    ).catch((err)=>{
      console.error('Erro ao requisitar os Livros da Biblia: ',err);
    });
  }

  getChapters(){
    if (this.chapters.length) {
      this.chapters = []
    }
   this.service.requestChapters(this.book.name).toPromise().then((chaptersLength) => {
     for(var i = 1; i < chaptersLength; i++){
      this.chapters.push(i);
     }
  }).catch((err)=>{
    console.error(`Erro ao requisitar os capitulos do livro de ${this.book.name} da Biblia: `,err);
  });
  }

  getChapter(){
    if (this.verses.length) {
      this.verses = []
    }
    this.service.requestChapter(this.book.name,this.chapterNumber).toPromise().then((verses) => {
      for (const i in verses) {
        let pos = Number(i)
        this.verses.push({number: pos + 1 , text: verses[pos]})
      }
    }).catch((err)=>{
      console.error(`Erro ao requisitar os versiculos do livro de ${this.book} capitulo ${this.chapterNumber} da Biblia: `,err)
    }); 
  }

  view(view){
    view.parentNode.style.display = "none"
    /*
    if (view.parentNode.style.marginLeft === '0px') {
      view.parentNode.style.marginLeft = '-280px'
    }else{
      view.parentNode.style.marginLeft = '0px'
    }*/
  }
  linkVerse(e){
    this.idVerse = e
    console.log(e)
    alert(e)
  }

}
