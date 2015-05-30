var acceptedLetters = new char[] { 'a', 'b', 'c', 'd', 'e', 'f'};
var letters = word.toCharArray().Distinct();
int wordValue = 0;
foreach (var i in letters{
	if (acceptedLetters.indexOf(i) == -1)
		continue;
	wordvalue |= 1 << acceptedLetters.indexOf(i);
}
