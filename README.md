# TODO:

* Test the group system. //Stuff like trying to join a group while already in one, or trying to leave a group without being in one etc. Most likely will crash
* Add the scanning functions to the scanner. //After this make scanned items go into the db.
* user authentication //Mostly done, the bells and whistles have been left - like all the info on the account page and stuff like that
* Finish integrating database functions to all the pages //Should be done? Might have missed some. Global states have been scrapped with regards to the db.
* code refactoring/linting

# Bugs to fix:

* Removing an item from Shoplist causes two items to appear in main item list. (Happens rarely. No idea why)
* Canceling the date selection when an item from shoplist is tapped leads to dateState error