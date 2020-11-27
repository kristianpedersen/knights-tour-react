# Knight's tour visualization

Click on any position on a chess board of variable size, and see a solution for the Knight's Tour, if one exists.

The colors go from 0 to 270 degrees on the color wheel. The start is therefore red, while the end goes towards purple.

# Help wanted

* My algorithm is biased towards the left - probably because when sorting alternatives with the same number of possibilities, the first list items get favored. Is this correct, and can the algorithm be improved?
* On larger boards, the SVG lines should probably be pre-generated, with a fun loading indicator to prevent users from experiencing sluggishness.
* No accessibility tests have been done, and no user testing either.
* This is one of my first React projects, and there are probably some best practices that would be helpful for me to learn.