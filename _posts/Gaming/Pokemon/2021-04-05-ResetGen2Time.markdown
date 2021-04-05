---
layout: post
title: "[Pokemon]Adjusting the time on Pokemon Gold/Silver/Crystal"
date: 2021-04-05 9:05:00 -0700
tags: ["gaming", "pokemon", "pokemon generation 2"]
categories: ["Gaming", "Pokemon"]
---
<script src="/assets/scripts/gaming/PokemonTimeChange.js"></script>

How to reset the time on Pokemon Gold, Silver, and Crystal

For Pokemon Gold and Silver, Press and hold DOWN + SELECT + B
<br />
For Pokemon Crystal:

First hold DOWN + SELECT + B, then release down and B, leaving the select button pressed. Then while still holding SELECT, hold UP + LEFT. Now while holding up and left, release the SELECT button.

If successful, you will have a screen that pops up asking if you want to reset the time.

[The steps to do so are also listed on bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Time#Western_Gold_and_Silver)

<br />

Trainer Name:
<textarea ID="trname">Name</textarea>

Money:
<textarea ID="trmoney">3000</textarea>

Trainer ID:
<textarea ID="trid">00000</textarea>

<button onClick="{
	pwbox.value = GetPassword(trname.value, trmoney.value, trid.value);
	pwbox.value = pwbox.value.padStart(5, '0');
}">Calculate</button>

Password:
<textarea ID="pwbox" disabled=true>Password</textarea>