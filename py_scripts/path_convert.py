import os
import sys

def getPathStyle(text):
    if '\\' in text:
        return 'win_file_path'
    elif 'http://' in text or 'https://' in text:
        return 'http_link'
    elif '/' in text:
        return 'unix_file_path'

    
def convert(original, win_prefix, unix_prefix):
    if win_prefix == "none":
        win_prefix = ""
    if unix_prefix == "none":
        unix_prefix = ""
    
    path = original
    path_style = getPathStyle(path)
    
    if 'win_file_path' == path_style:
        # convert to unix file path
        if path.startswith(win_prefix):
            path = path[len(win_prefix):]
        
        if ':' in path:
            colon_pos = path.rindex(':')
            path = path[colon_pos+1:] # drop part before `:`
            
        path = path.strip('\\').replace("\\", "/")
        path = unix_prefix + path
    
    elif 'unix_file_path' == path_style:
        # convert to windows file path
        if path.startswith(unix_prefix):
            path = path[len(unix_prefix):]
        
        path = path.strip('/').replace("/", "\\")
        path = win_prefix + path
    
    return path
	
	
print(convert(sys.argv[1], sys.argv[2], sys.argv[3]))