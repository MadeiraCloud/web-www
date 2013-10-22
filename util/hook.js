// Listen on port 3000
var gith = require('gith').create( 3000 );
// Import execFile, to run our bash script
var execFile = require('child_process').execFile;

gith({
	repo: 'MadeiraCloud/web-www'
}).on( 'all', function( payload ) {
	//console.log(payload);
	if( payload.branch === 'master' )
	{
		console.log("start update master branch");
		console.log("commit id:" + payload.original.head_commit.id + ", timestamp:" + payload.original.head_commit.timestamp );
		//console.log("author:" + payload.original.head_commit.author );
		//console.log("committer:" + payload.original.head_commit.committer );
		// Exec a shell script
		execFile('/home/ec2-user/www/hook.sh', function(error, stdout, stderr) {
			// Log success in some manner
			console.log( 'exec complete' );
		});
	}
});