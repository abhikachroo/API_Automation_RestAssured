package getRequests;

import org.testng.Assert;
import org.testng.annotations.Test;

import com.jayway.restassured.http.ContentType;
//import com.jayway.restassured.http.ContentType;
import com.jayway.restassured.response.Response;

import static com.jayway.restassured.RestAssured.*;

public class getReqs {

	//@Test
	public void getPosts() {

		Response resp = when().get("http://jsonplaceholder.typicode.com/posts");

		// Print the Status Code
		System.out.println(resp.getStatusCode());
		// Print the response
		System.out.println("Response is " + resp.asString());

		// Assertion to compare the Status code
		Assert.assertEquals(resp.getStatusCode(), 200);
		if (resp.getStatusCode() == 200) {
			System.out.println("API is working fine");
		} else {
			System.out.println("API is not working fine");
		}

	}
	
//Validate json path - https://jsonpath.herokuapp.com/	
	@Test
	public void jsonPath() {
		
		String Title = 
		when().get("http://jsonplaceholder.typicode.com/posts").
		then().
		contentType(ContentType.JSON).
		extract().
		path("[6].title"); //To Print Title of 6th Node- using jsonpath
		
		System.out.println("Title of 6th Element: "+Title);
		
	}
	
	
}