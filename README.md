Reflection:

1. Challenges faced during the project.
   
   I find that somewhere around 100 lines of code, my mind starts to lose track of the macro-structure of my logic. It's
   at this point that I have to constantly remember what is referencing what, which makes debugging quite...fun. Also, I
   made the mistake of tackling the JS first, and THEN trying to translate everything into Bulma, and I've since learned that
   I should be doing BOTH JS + Bulma in tandem, to make sure they are in harmony every step of the way. As a result,
   my product as-is is not mobile-friendly. Lastly, my biggest challenge was "grasping" the concept of
   "first row = use ID" + "children = use class"; once this clicked, everything became easier, but until then I kept
   running into walls where nothing would work because (as it turned out) my added functionality was only being applied to
   the parent row (via id). 

2. How you approached solving those challenges.

   It really comes down to constantly testing things. I have gotten better at not allowing myself to get carried away writing
   code for long chunks of time without testing anything. Also, one must be discerning of patterns. It's a tad embarassing, but
   I eventually realized that my biggest problem was that newly added functionality resulted in my "adding a new to do" and
   none of the tasks showing up; it clicked that an inheritance problem was probably the culprit. Going forward, I'm hoping
   my stumbling my way through this SBA will make future inheritance-centered problems easier to conceptualize and work through.

3. What you would improve if given more time.
   
   Did not get to requirement 5, which was to add + enable functionality for local storage. This was a lot to look into with the time
   I had left so I decided to learn this afterwards. I understand points will be deducted for not meeting this requirement, but I will
   return and test functionality for local storage when learning this subject arises again. All in all, pleased with what I did manage
   to come up with. Hardest homework so far, for sure.

   Update: I DID get to tackle requirement 5, and I THINK I was at least somewhat successful (see "local_storage_test" image, which
   is a screenshot of what I think I was supposed to be looking at for testing local storage functionality on the browser).
   Consulted w3schools and MDN, was surprised by how little information there was on local storage, then it occured to me
   all I had to do was know how to store and retrieve data someplace, then re-input those values into my functionality.
   I made a "double" function because I did not want to break the OG one. With more time I would explore the most optimal way
   to tackle the local storage requirement.