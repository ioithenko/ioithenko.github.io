---
# Leave the homepage title empty to use the site title
title:
date: 2025-03-22
type: landing

sections:
  - block: hero
    content:
      title: |
        PureCheck
      image:
        filename: welcome.jpg
      text: |
        <br>
        
        Наш инновационный детектор свежести — это простое и надежное решение, которое за секунды определяет качество мяса, рыбы, молочных и других скоропортящихся продуктов. С этим компактным устройством вы всегда будете уверены в безопасности и свежести того, что попадает на ваш стол или прилавок.
          
  - block: collection
    content:
      title: Материалы проекта
      subtitle:
      text:
      count: 5
      filters:
        author: ''
        category: ''
        exclude_featured: false
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
      page_type: post
    design:
      view: card
      columns: '1'

  - block: markdown
    content:
      title:
      subtitle:
      text: |
        {{% cta cta_link="./people/" cta_text="Meet the team →" %}}
    design:
      columns: '1'
---