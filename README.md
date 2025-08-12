# Grimwild Roll20 Character Sheet

A custom character sheet for the **Grimwild** tabletop RPG, designed for use with Roll20. (Note that I have no affilitation with Oddity Press.)
<img src="https://github.com/user-attachments/assets/b447f2df-7922-4e4d-aaae-b92fd7161916" align="center" width="400" style="margin-left: 20px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px;">
<div style="center: 430px;"></div>
<br clear="right">

## Features

- **Attribute Rolling**: Click attribute names (Brawn, Agility, Wits, Presence) to roll dice for action/defense rolls
- **Thorn System**: Auto handling of difficulty and mark/harm thorns
- **Pool Rolling**: Build and roll dice pools while the sheet automatically determines drops
- **Other Rolls**: Dice can be added manually for Story, Montage, or Assist rolls  
- **Mark Tracking**: Clickable fields with each attribute for mark tracking, which auto remove when used 
- **Condition Management**: Bloodied and Rattled condition tracking
- **Custom Roll Templates**: Styled roll outputs

## Installation

### For Roll20 Game Creators:

1. In your Roll20 game, go to **Settings > Game Settings**
2. Scroll down to **Character Sheet Template**
3. Select **"Custom"**
4. Copy and paste the contents of `grimwild_r20_v1.html` into the **HTML Layout** tab
5. Copy and paste the contents of `grimwild_r20_v1.css` into the **CSS Styling** tab
6. If using the API features, install `grimwild-r20_v1api.js` as an API script

### API Commands (Pro Subscription Required):

- `!grimwild [dice] [thorns] [attribute]` - Roll attribute dice with thorns
- `!grimpool [size]` - Roll a dice pool and calculate drops

## File Structure

- `grimwild_r20_v1.html` - Character sheet HTML layout and JavaScript
- `grimwild_r20_v1.css` - Styling and roll template formatting
- `grimwild-r20_v1api.js` - API script for enhanced rolling features

## Game System

This sheet is designed for **Grimwild**, a tabletop RPG by Oddity Press. Find the free edition here: https://www.drivethrurpg.com/en/product/507201/grimwild-free-edition .

## Contributing

Would love to collaborate, feel free to submit issues or pull requests if you find bugs or want to suggest improvements! You can reach me (as Dedalus) on the Oddity Press discord: https://discord.com/invite/bNr5wXFmSk. 

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

This character sheet has been designed and created for the Grimwild RPG system based on the work of J.D. Maxwell and his collaborators at Oddity Press. This design and api integration was heavily influenced by the orignal character sheet and book layout of the original Grimwild materials. 

## Updates

Other feature I might add in the future (or would appreciate others assisting with) would be a second tab of the sheet for tracking addition elements (arcana, treasure, etc.), as well as proper integration for those without API support. 
