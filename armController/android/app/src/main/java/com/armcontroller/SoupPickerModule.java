package com.armcontroller;

import com.facebook.react.bridge.ReactContextBaseJavaModule;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import android.widget.Toast;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Arrays;

public class SoupPickerModule extends ReactContextBaseJavaModule {

    public SoupPickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
	public String getName() {
	    return "SoupPicker";
	}

	@ReactMethod
    public void DownloadMusic(String html, Callback errorCallback, Callback successCallback) {
    	String youtube = "https://www.youtube.com";
    	ArrayList<String> templist = new ArrayList<>();
		try{
			Document document = Jsoup.parse(html);


			System.out.println("==== Get Title ====");
			System.out.println(document.title());
			System.out.println("==== Get Title ====");

			Element div_content = document.getElementById("content");
			Elements video_links = div_content.getElementsByTag("a");

			//Elements video_title = document.select("h3");

			System.out.println("===========================================================");
			/*for (Element link : video_title) {
				System.out.println("name: " + link.text());
		    }*/
		    String temp = ""; // <- check for double getting
		    ArrayList<String> youtubelinks = new ArrayList<>();
			for (Element link : video_links) {
				if(link.attr("href").indexOf("watch") != -1){
					if(!link.attr("href").equals(temp)){
						System.out.println("url: " + youtube + link.attr("href"));
						youtubelinks.add(youtube + link.attr("href"));
						temp = link.attr("href");
					}
				}
		        //FileOutputStream output = new FileOutputStream("/mp3/" + ".mp3");
		    }
		    templist = youtubelinks;
		    System.out.println("===========================================================");
		}catch (Exception e){
			errorCallback.invoke(e.getMessage());
		}

		String json = new Gson().toJson(templist);
		successCallback.invoke(json);
		/*
		String[] pack = templist.toArray(new String[templist.size()]);
		successCallback.invoke(Arrays.toString(pack));*/
		/*String[] pack = new String[templist.size()];
		pack = templist.toArray(pack);
		successCallback.invoke(pack);*/
		//successCallback.invoke(templist);
    }
}