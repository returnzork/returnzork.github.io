---
layout: page
permalink: /tag/
---
<!-- modified from https://github.com/jokecamp/jokecamp.com/blob/master/tag.md -->
<html>
<ul>
{% for tag in site.tags %}
  {% assign t = tag | first %}
  <li><a href="/tag/#{{t | downcase | replace:" ","-" }}">{{t | downcase }}</a></li>
{% endfor %}
</ul>



{% for tag in site.tags %}
  {% assign t = tag | first %}
  {% assign posts = tag | last %}
  <a name="{{t | downcase | replace:" ","-" }}">
    <a href="/tag/#{{t | downcase | replace:" ","-" }}">{{ t | downcase }}</a>
    <ul>
      {% for post in posts %}
        <li>
          <a href="{{ post.url }}">{{ post.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </a>
{% endfor %}
</html>
