# Grimwild Roll20 Character Sheet

A custom character sheet for the **Grimwild** tabletop RPG, designed for use with Roll20. (Note that I have no affilitation with Oddity Press.) <br>
<img src="https://github.com/user-attachments/assets/b447f2df-7922-4e4d-aaae-b92fd7161916" align="center" width="400" style="margin-left: 20px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px;">
<img src="https://github.com/user-attachments/assets/7dabfa15-b7f6-4751-a12f-274db28a902e" align="top-center" width="250" style="margin-left: 20px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px;">
<div style="center: 430px;"></div>

## Features
<img src="https://github.com/user-attachments/assets/50a0dedd-77b2-466a-83df-e7a402f356f2" align="right" width="300" style="margin-left: 20px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px;">
<div style="margin-right: 430px;">
  
- **Attribute Rolling**: Click attribute names (Brawn, Agility, Wits, Presence) to roll dice for action/defense rolls
- **Thorn System**: Auto handling of difficulty and mark/harm thorns
- **Pool Rolling**: Build and roll dice pools while the sheet automatically determines drops
- **Other Rolls**: Dice can be added manually for Story, Montage, or Assist rolls  
- **Mark Tracking**: Clickable fields with each attribute for mark tracking, which auto remove when used 
- **Condition Management**: Bloodied and Rattled condition tracking
- **Custom Roll Templates**: Styled roll outputs

</div>

## Installation

### For Roll20 Game Creators:

1. In your Roll20 game, go to **Settings > Game Settings**
2. Scroll down to **Character Sheet Template**
3. Select **"Custom"**
4. Copy and paste the contents of `grimwild_r20_v1.1.html` into the **HTML Layout** tab
5. Copy and paste the contents of `grimwild_r20_v1.1.css` into the **CSS Styling** tab
6. If using the API features, install `grimwild-r20_v1.1api.js` as an API script by heading to the Mod (API Scripts) in game settings, creating a new API with any name you'd like, then paste in the API script, save, and run. 

### API Commands (Pro Subscription Required):

- `!grimwild [dice] [thorns] [attribute]` - Roll attribute dice with thorns, can roll without attribute as well for story/montage/assist rolls. 
- `!grimpool [size]` - Roll a dice pool and calculate drops

## Current Files

- `grimwild_r20_v1.1.html` - Character sheet HTML layout and JavaScript
- `grimwild_r20_v1.1.css` - Styling and roll template formatting
- `grimwild-r20_v1.1api.js` - API script for enhanced rolling features

## Game System

This sheet is designed for **Grimwild**, a tabletop RPG by Oddity Press. Find the free edition here: https://www.drivethrurpg.com/en/product/507201/grimwild-free-edition , or the full edition with extra chapters here: https://www.drivethrurpg.com/en/product/508618/grimwild-cinematic-fantasy-roleplaying . 

## Contributing

Would love to collaborate, feel free to submit issues or pull requests if you find bugs or want to suggest improvements! You can reach me (as Dedalus) on the Oddity Press discord: https://discord.com/invite/bNr5wXFmSk.There is a thread for this project in Crafted Projects.

## License

This project is licensed under the MIT License, see the license file for details.

## Credits

This character sheet has been designed and created for the Grimwild RPG system based on the work of J.D. Maxwell and his collaborators at Oddity Press. This design of the sheet and api integration was heavily influenced by the original character sheet and book layout. 

## Updates

Other aspirational features I might add in the future (or would appreciate others assisting with):
- Saving the height of resiazable text entry fields in talent section (Roll20 has been fighting me on this if anyone has a solution)
- Second tab of the sheet for tracking addition elements (arcana, treasure, etc.)
- Proper integration for those without API support
- More GM support in terms of managing multiple pools over time (but not sure when/if I'll get there)
- More GM support in terms of managing suspense (could just be a macro tied to a resource item?)  
- API update to give players more guidance on critical options
- More specific Path abilities accounted for
- And of course fine-tuning layout/features as feedback comes in
