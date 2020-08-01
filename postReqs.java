package postRequests;
import org.testng.annotations.Test;
import com.jayway.restassured.http.ContentType;
import com.jayway.restassured.response.Response;
import postobjs.postObjects;
import static com.jayway.restassured.RestAssured.*;

//This class with is for Post, Patch, and Delete requests

public class postReqs {

	@Test
	public void postreq(){

		//Calling Methods from other Class
		postObjects posts = new postObjects(); 
		posts.setUserid("new Post");
		posts.setId("101");
		posts.setTitle("New Post Title");
		posts.setBody("post body added");
		

		Response resp = given().
				when().
				contentType(ContentType.JSON).
				body(posts). // Using body Object to pass the body
				post("http://jsonplaceholder.typicode.com/posts");


		System.out.println("response : " + resp.asString());

			}
	//
	//Put request
	@Test
	public void putreq() {
		
		postObjects posts = new postObjects(); 
		posts.setUserid("new Post");
		posts.setId("101");
		posts.setTitle("Put Post Title");
		posts.setBody("Put body Update");
		
		Response resp = given().
		when().
		contentType(ContentType.JSON).
		body(posts).
		put("http://jsonplaceholder.typicode.com/posts/101");
		
		System.out.println("Put API response : " + resp.asString());
		
	}
	
	// To update record using Patch
	// @Test
	public void patchreq() {
		Response resp = given().
				body("{ \"title\":\"updated by Patch request\" }").
				when().
				contentType(ContentType.JSON).
				patch("http://jsonplaceholder.typicode.com/posts/101");
				
				System.out.println("PATCH request : "+ resp.asString());
		
	}
	
	// To delete particular record
	//@Test
	public void delteReq() {
		
		Response resp = given().
				when().
				delete("http://jsonplaceholder.typicode.com/posts/101");
				
				System.out.println("Deleting response : "+ resp.asString());
	}
	
	// To get response time of request
	//@Test
	public void getResTime() {
		Response resp = given().
		    	when().
		    	get("http://jsonplaceholder.typicode.com/posts/");
		    	
		    	Long time = resp.
		    	then().
		    	extract().
		    	time();
		    	
		    	System.out.println("Response time is : "+ time);
		
	}
}